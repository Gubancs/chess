/**
 * Created by kokeny on 27/09/15.
 */


/// <reference path="Piece.ts"/>

class GamePosition {

    private static EMPTY_POS:string = "8/8/8/8/8/8/8/8 w - - 0 0";
    private static START_POS:string = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
    private static FIELD_SEP:string = " ";
    private static ROW_SEP:string = "/";

    private piecePlacement:Array<Piece>;

    private fen:string;

    private whiteKingSideCastle:boolean = false;
    private whiteQueenSideCastle:boolean = false;
    private blackKingSideCastle:boolean = false;
    private blackQueenSideCastle:boolean = false;

    private activeColor:PieceColor = PieceColor.LIGHT;

    private halfMoveCounter:number = 0;
    private numberOfMoves:number = 0;

    private enPassantNotation:string = "-";

    constructor() {
        this.piecePlacement = new Array<Piece>();
    }

    public static empty():GamePosition {
        return GamePosition.fromFENString(GamePosition.EMPTY_POS);
    }

    public static startPosition():GamePosition {
        return GamePosition.fromFENString(GamePosition.START_POS);
    }

    /**
     * Create GamePosition from a valid FEN string
     * This functions allows you to load a game position from Forsyth–Edwards Notation.
     *
     * @return {null}
     */
    public static fromFENString(fenString:string):GamePosition {

        console.debug("[PgnViewer] - create position from FEN string", fenString);

        var gamePosition:GamePosition = new GamePosition();
        gamePosition.fen = fenString;

        var fenFields:Array<string> = fenString.split(GamePosition.FIELD_SEP);

        //Piece placement (from white's perspective)
        var piecePlacement:string = fenFields[0];
        if (piecePlacement) {

            //Initialize piece placement
            var rows:Array<string> = piecePlacement.split(GamePosition.ROW_SEP);
            rows.reverse();

            for (var rowIndex in rows) {
                var rowString = rows[rowIndex];
                for (var column = 0, len = rowString.length; column < len; column++) {
                    var value:string = rowString[column];
                    if (isNaN(parseInt(value))) {
                        var piece = Piece.fromFENString(value);
                        gamePosition.piecePlacement.push(piece);
                    }

                    //Empty squares are noted using digits 1 through 8
                    else {
                        var emptySquares:number = parseInt(rowString[column]);
                        for (var i = 0; i < emptySquares; i++) {
                            gamePosition.piecePlacement.push(null);
                        }
                    }
                }
            }
        }
        //Active color. "w" means White moves next, "b" means Black.
        var activeColor:string = fenFields[1];
        if (activeColor) {
            gamePosition.activeColor = activeColor == "b" ? PieceColor.DARK : PieceColor.LIGHT;
        }

        //Castling availability.
        var castlingAvailability:string = fenFields[2];

        //If neither side can castle, this is "-".
        if (castlingAvailability && castlingAvailability != '-') {

            //"K" (White can castle kingside)
            if (castlingAvailability.indexOf("K") > -1) {
                gamePosition.whiteKingSideCastle = true;
            }

            //"Q" (White can castle queenside)
            if (castlingAvailability.indexOf("Q") > -1) {
                gamePosition.whiteQueenSideCastle = true;
            }

            //"k" (Black can castle kingside)
            if (castlingAvailability.indexOf("k") > -1) {
                gamePosition.blackKingSideCastle = true;
            }

            //"q" (Black can castle queenside).
            if (castlingAvailability.indexOf("q") > -1) {
                gamePosition.blackQueenSideCastle = true;
            }
        }

        //En passant target square in algebraic notation
        if (fenFields[3]) {
            gamePosition.enPassantNotation = fenFields[3];
        }

        //Halfmove clock: This is the number of halfmoves since the last capture or pawn advance
        if (fenFields[4]) {
            gamePosition.halfMoveCounter = parseInt(fenFields[4], 10);
        }

        //Fullmove number: The number of the full move. It starts at 1, and is incremented after Black's move.
        if (fenFields[5]) {
            gamePosition.numberOfMoves = parseInt(fenFields[5], 10);
        }

        return gamePosition;
    }

    /**
     * Convert game position to the FEN string.
     *
     * @return {string} Return the FEN string representation of the game position
     */
    public toFENString():string {
        console.debug("[PgnViewer] - convert position to FEN string", this);

        var fenFields:Array<string> = new Array<string>();
        var piecePlacement:string = "";
        var emptySquares:number = 0;
        this.piecePlacement.forEach(function (piece:Piece, index:number) {
            if (index % 8 == 0) {
                if (emptySquares > 0) {
                    piecePlacement += emptySquares;
                    emptySquares = 0;
                }
                if (index != 0) {
                    piecePlacement += GamePosition.ROW_SEP;
                }
            }
            if (piece != null) {
                if (emptySquares > 0) {
                    piecePlacement += emptySquares;
                    emptySquares = 0;
                }
                piecePlacement += piece.toFENString();
            } else {
                emptySquares++;
            }
        });
        if (emptySquares > 0) {
            piecePlacement += emptySquares;
            emptySquares = 0;
        }
        var rows:Array<string> = piecePlacement.split(GamePosition.ROW_SEP);
        rows.reverse();
        fenFields.push(rows.join(GamePosition.ROW_SEP));

        //Active color
        fenFields.push(this.activeColor.toFENString());

        //Castling availability.
        var castlingAvailability = "";
        if (this.whiteKingSideCastle) {
            castlingAvailability += "K";
        }
        if (this.whiteQueenSideCastle) {
            castlingAvailability += "Q";
        }
        if (this.blackKingSideCastle) {
            castlingAvailability += "k";
        }
        if (this.blackQueenSideCastle) {
            castlingAvailability += "q";
        }
        fenFields.push(castlingAvailability.length > 0 ? castlingAvailability : "-");


        //En passant target square in algebraic notation
        fenFields.push(this.enPassantNotation);

        //Half move clock: This is the number of halfmoves since the last capture or pawn advance
        fenFields.push(this.halfMoveCounter.toString());

        //Full move number: The number of the full move. It starts at 1, and is incremented after Black's move.
        fenFields.push(this.numberOfMoves.toString());

        var fenString = fenFields.join(GamePosition.FIELD_SEP);
        console.debug("[PgnViewer] - FEN string : '%s'", fenString);

        return fenString;
    }

    /**
     * Iterate on own piece placement array
     *
     * @param callbackfn
     */
    forEach(callbackfn:(row:number, col:number, piece?:Piece) => void):void {

        this.piecePlacement.forEach(function (piece:Piece, index:number) {
            var row = Math.floor(index / 8);
            var col = Math.floor(index % 8);
            callbackfn(row, col, piece);
        })
    }

}