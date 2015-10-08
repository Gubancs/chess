/// <reference path="../chessjs/chessjs.d.ts" />
declare class Component {
    private static ID_SEQUENCE;
    private static CSS_PREFIX;
    private static ID_PREFIX;
    private parent;
    private children;
    private htmlElement;
    private id;
    private size;
    constructor();
    protected render(htmlElement: HTMLElement): void;
    protected createElement(): HTMLElement;
    protected initComponent(): void;
    renderTo(targetHtmlElement: HTMLElement): void;
    protected add(child: Component): Component;
    protected addClass(cssClass: string): void;
    protected removeClass(cssClass: string): void;
    protected getParent(): Component;
    protected getChildren(): Array<Component>;
    remove(child: Component): void;
    rotate(deg: number): void;
    setVisibility(visible: boolean): void;
    protected setData(attribute: string, value: string): void;
}
declare class PieceType {
    static PAWN: PieceType;
    static KNIGHT: PieceType;
    static BISHOP: PieceType;
    static ROOK: PieceType;
    static QUEEN: PieceType;
    static KING: PieceType;
    value: string;
    constructor(value: string);
    static fromValue(value: string): PieceType;
}
declare class PieceColor {
    static LIGHT: PieceColor;
    static DARK: PieceColor;
    name: string;
    notation: string;
    constructor(name: string, notation: string);
    toFENString(): string;
}
declare class Piece extends Component {
    private pieceType;
    private pieceColor;
    private notation;
    constructor(pieceType: PieceType, pieceColor: PieceColor);
    protected createElement(): HTMLElement;
    protected initComponent(): void;
    toFENString(): string;
    static fromFENString(fenString: string): Piece;
}
declare class Square extends Component {
    private static DARK;
    private static LIGHT;
    private _row;
    private _column;
    private _coordinate;
    private _color;
    private _currentPiece;
    constructor(column: number, row: number);
    protected initComponent(): void;
    private static humanReadable(square);
    showPiece(piece: Piece): void;
    clear(): void;
    row(): number;
    column(): number;
    color(): string;
    coordinate(): string;
    highlight(): void;
    unHighlight(): void;
    removePiece(): Piece;
    currentPiece(): Piece;
    protected createElement(): HTMLElement;
}
declare class GamePosition {
    private static EMPTY_POS;
    private static START_POS;
    private static FIELD_SEP;
    private static ROW_SEP;
    private piecePlacement;
    private fen;
    private whiteKingSideCastle;
    private whiteQueenSideCastle;
    private blackKingSideCastle;
    private blackQueenSideCastle;
    private activeColor;
    private halfMoveCounter;
    private numberOfMoves;
    private enPassantNotation;
    constructor();
    static empty(): GamePosition;
    static startPosition(): GamePosition;
    static fromFENString(fenString: string): GamePosition;
    toFENString(): string;
    forEach(callbackfn: (row: number, col: number, piece?: Piece) => void): void;
}
declare class ChessBoard extends Component {
    static SIZE: number;
    private chess;
    private currentPosition;
    constructor(fen?: string);
    protected render(htmlElement: HTMLElement): void;
    protected initComponent(): void;
    clearBoard(): void;
    private getSquare(coordinate);
    private findSquare(column, row);
    initStartPosition(): void;
    protected createElement(): HTMLElement;
    move(from: string, to: string): void;
    setPosition(position: GamePosition): void;
    flipBoard(): void;
}
declare class PgnViewer extends Component {
    static CSS_CLASS: string;
    chessBoard: ChessBoard;
    constructor();
    protected initComponent(): void;
    loadGame(pgn: string[]): void;
    flipBoard(): void;
    nextMove(): void;
    previousMove(): void;
    startPosition(): void;
    endPosition(): void;
}
