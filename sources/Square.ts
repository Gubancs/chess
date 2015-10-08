/**
 * Created by kokeny on 26/09/15.
 */

/// <reference path="Component.ts"/>
/// <reference path="Piece.ts"/>

/**
 *
 * @aughor Gabor Kokeny
 */
class Square extends Component {

    private static DARK:string = "dark";

    private static LIGHT:string = "light";

    private _row:number;

    private _column:number;

    private _coordinate:string;

    private _color:string;

    private _currentPiece:Piece;

    /**
     * Create a new instance of the Square
     * @param column
     * @param row
     */
    constructor(column:number, row:number) {
        super();
        this._column = column;
        this._row = row;
        this._coordinate = Square.humanReadable(this).toLowerCase();
        this._color = this.row() % 2 == this.column() % 2 ? Square.LIGHT : Square.DARK;
    }


    protected initComponent():void {
        this.addClass("square");

        if (this._color == Square.LIGHT) {
            this.addClass(Square.LIGHT);
        } else {
            this.addClass(Square.DARK);
        }

        this.setData("square", this._coordinate);
    }

    private static humanReadable(square:Square):string {
        var name = "";
        switch (
            square.row()) {
            case 0:
                name = "a";
                break;
            case 1:
                name = "b";
                break;
            case 2:
                name = "c";
                break;
            case 3:
                name = "d";
                break;
            case 4:
                name = "e";
                break;
            case 5:
                name = "f";
                break;
            case 6:
                name = "g";
                break;
            case 7 :
                name = "h";
                break;
        }

        return name + (square.column() + 1);
    }

    showPiece(piece:Piece):void {
        if (piece == null) {
            this.removePiece();
        }
        else {
            this.removePiece();

            this._currentPiece = piece;
            this.add(this._currentPiece);
        }
    }

    clear():void {
    }

    row():number {
        return this._row;
    }

    column():number {
        return this._column;
    }

    color():string {
        return this._color;
    }

    coordinate():string {
        return this._coordinate;
    }

    highlight():void {
        console.debug("[PgnViewer] - highlight square", this);
        this.addClass("highlight");
    }

    unHighlight():void {
        this.removeClass("highlight");
    }

    removePiece():Piece {
        if (this._currentPiece != null) {
            this.remove(this._currentPiece);
        }

        return this._currentPiece;
    }

    currentPiece():Piece {
        return this._currentPiece;
    }

    protected createElement():HTMLElement {
        return document.createElement("div");
    }
}