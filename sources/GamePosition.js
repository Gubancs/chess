/**
 * Created by kokeny on 27/09/15.
 */
/// <reference path="Piece.ts"/>
var GamePosition = (function () {
    function GamePosition() {
        this.whiteKingSideCastle = false;
        this.whiteQueenSideCastle = false;
        this.blackKingSideCastle = false;
        this.blackQueenSideCastle = false;
        this.activeColor = PieceColor.LIGHT;
        this.halfMoveCounter = 0;
        this.numberOfMoves = 0;
        this.enPassantNotation = "-";
        this.piecePlacement = new Array();
    }
    GamePosition.empty = function () {
        return GamePosition.fromFENString(GamePosition.EMPTY_POS);
    };
    GamePosition.startPosition = function () {
        return GamePosition.fromFENString(GamePosition.START_POS);
    };
    /**
     * Create GamePosition from a valid FEN string
     * This functions allows you to load a game position from Forsyth–Edwards Notation.
     *
     * @return {null}
     */
    GamePosition.fromFENString = function (fenString) {
        console.debug("[PgnViewer] - create position from FEN string", fenString);
        var gamePosition = new GamePosition();
        gamePosition.fen = fenString;
        var fenFields = fenString.split(GamePosition.FIELD_SEP);
        //Piece placement (from white's perspective)
        var piecePlacement = fenFields[0];
        if (piecePlacement) {
            //Initialize piece placement
            var rows = piecePlacement.split(GamePosition.ROW_SEP);
            rows.reverse();
            for (var rowIndex in rows) {
                var rowString = rows[rowIndex];
                for (var column = 0, len = rowString.length; column < len; column++) {
                    var value = rowString[column];
                    if (isNaN(parseInt(value))) {
                        var piece = Piece.fromFENString(value);
                        gamePosition.piecePlacement.push(piece);
                    }
                    else {
                        var emptySquares = parseInt(rowString[column]);
                        for (var i = 0; i < emptySquares; i++) {
                            gamePosition.piecePlacement.push(null);
                        }
                    }
                }
            }
        }
        //Active color. "w" means White moves next, "b" means Black.
        var activeColor = fenFields[1];
        if (activeColor) {
            gamePosition.activeColor = activeColor == "b" ? PieceColor.DARK : PieceColor.LIGHT;
        }
        //Castling availability.
        var castlingAvailability = fenFields[2];
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
    };
    /**
     * Convert game position to the FEN string.
     *
     * @return {string} Return the FEN string representation of the game position
     */
    GamePosition.prototype.toFENString = function () {
        console.debug("[PgnViewer] - convert position to FEN string", this);
        var fenFields = new Array();
        var piecePlacement = "";
        var emptySquares = 0;
        this.piecePlacement.forEach(function (piece, index) {
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
            }
            else {
                emptySquares++;
            }
        });
        if (emptySquares > 0) {
            piecePlacement += emptySquares;
            emptySquares = 0;
        }
        var rows = piecePlacement.split(GamePosition.ROW_SEP);
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
    };
    /**
     * Iterate on own piece placement array
     *
     * @param callbackfn
     */
    GamePosition.prototype.forEach = function (callbackfn) {
        this.piecePlacement.forEach(function (piece, index) {
            var row = Math.floor(index / 8);
            var col = Math.floor(index % 8);
            callbackfn(row, col, piece);
        });
    };
    GamePosition.EMPTY_POS = "8/8/8/8/8/8/8/8 w - - 0 0";
    GamePosition.START_POS = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
    GamePosition.FIELD_SEP = " ";
    GamePosition.ROW_SEP = "/";
    return GamePosition;
})();
//# sourceMappingURL=GamePosition.js.map