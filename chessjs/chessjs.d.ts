/**
 * Created by kokeny on 06/10/15.
 */


/**
 * Chess library that is used for chess move generation/validation, piece placement/movement,
 * and check/checkmate/stalemate detection
 */
declare class Chess {

    BLACK:string;
    WHITE:string;

    PAWN:string;
    KNIGHT:string;
    BISHOP:string;
    ROOK:string;
    QUEEN:string;
    KING:string;

    DEFAULT_POSITION:string;

    /**
     *
     * @param fen
     */
    constructor(fen?:string);

    /**
     * Clears the board
     */
    clear():void;

    /**
     * Reset the board to the initial starting position.
     */
    reset():void;

    /**
     * Make some moves
     *
     * @param square The coordination of the target square on the chess table
     */
    move(square:string):void;

    /**
     * Passing a move object (only the 'to', 'from', and when necessary 'promotion', fields are needed):
     * @param move
     */
    move(move:Move):void;

    /**
     * Returns a list of legals moves from the current position. The function takes an optional
     * parameter which controls the single-square move generation and verbosity.
     */
    moves(moveOptions?:MoveOptions):Array<string|Move>;

    /**
     * Returns a string containing an ASCII diagram of the current position.
     */
    ascii():string;

    /**
     * Returns the FEN string for the current position.
     */
    fen():string;

    /**
     * Returns true if the game has ended via checkmate, stalemate, draw, threefold repetition,
     * or insufficient material. Otherwise, returns false.
     */
    game_over():boolean;

    /**
     * Returns true or false if the side to move is in check.
     */
    in_check():boolean;

    /**
     * Returns true or false if the side to move has been checkmated.
     */
    in_checkmate():boolean;

    /**
     * Returns true or false if the game is drawn (50-move rule or insufficient material).
     */
    in_draw():boolean;

    /**
     * Returns true or false if the side to move has been stalemated.
     */
    in_stalemate():boolean;

    /**
     * Returns true or false if the current board position has occurred three or more times.
     */
    in_threefold_repetition():boolean;

    /**
     * Returns true if the game is drawn due to insufficient material (K vs. K, K vs. KB, or K vs. KN); otherwise false.
     */
    insufficient_material():boolean;

    /**
     *Place a piece on square where piece is an object with the form { type: ..., color: ... }.
     * Returns true if piece was successfully placed, otherwise the board remains unchanged and false is returned.
     * put() will fail when passed an invalid piece or square, or when two or more kings of the same color are placed.
     * @param piece
     * @param square
     */
    put(piece:ChessPiece, square:string):void;

    /**
     * Returns the piece on the square:
     * @param square
     */
    get(square:string):ChessPiece;

    /**
     * The board is cleared and the FEN string is loaded. Returns true if
     * position was successfully loaded, otherwise false.
     * @param fen
     */
    load(fen:string):boolean;


    /**
     * oad the moves of a game stored in Portable Game Notation. Options is a optional parameter that contains
     * a 'newline_char' which is a string representation of a RegExp (and should not be pre-escaped)
     * and defaults to '\r?\n'). Returns true if the PGN was parsed successfully, otherwise false.
     * @param pgn
     * @param options
     */
    load_pgn(pgn:string, options?:any):void;

    /**
     * Returns the game in PGN format. Options is an optional parameter which may include
     * max width and/or a newline character settings.
     */
    pgn():string;

    /**
     * Remove and return the piece on square.
     */
    remove(square:string):ChessPiece;

    /**
     * Returns the color of the square ('light' or 'dark').
     */
    square_color():string;

    /**
     * Returns the current side to move.
     */
    turn():string;

    /**
     * Takeback the last half-move, returning a move object if successful, otherwise null.
     */
    undo():Move;


    /**
     * Returns a validation object specifying validity or the errors found within the FEN string.
     * @param fen
     */
    validate_fen(fen:string):ValidationResult;

    /**
     * Returns a list containing the moves of the current game. Options is an optional parameter which may
     * contain a 'verbose' flag. See .moves() for a description of the verbose move fields.
     */
    history(historyOptions?:HistoryOptions):Array<string>;


    header(...headerInformation:string[]):void;

}

interface ValidationResult {
    valid:boolean;
    error_number:number;
    error:string;
}


interface ChessPiece {
    type:string;
    color:string;
}

interface Move {
    color?:string;
    from:string;
    to:string;

    /**
     * The flags field in verbose mode may contain one or more of the following values:
     */
    flags?:string;


    piece?:string;

    /**
     * Standard Algebraic Notation (SAN)
     */
    san?:string;
}

interface MoveOptions {
    square:string;
    verbose?:boolean;
}
interface HistoryOptions {
    verbose?:boolean;
}

