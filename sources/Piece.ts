/**
 * Created by kokeny on 27/09/15.
 */


/// <reference path="Component.ts"/>

class PieceType {
    public static PAWN:PieceType = new PieceType("p");
    public static KNIGHT:PieceType = new PieceType("n");
    public static BISHOP:PieceType = new PieceType("b");
    public static ROOK:PieceType = new PieceType("r");
    public static QUEEN:PieceType = new PieceType("q");
    public static KING:PieceType = new PieceType("k");

    public value:string;

    constructor(value:string) {
        this.value = value;
    }

    public static fromValue(value:string):PieceType {
        var pieceType:PieceType = null;
        value = value.toLowerCase();
        if (value == PieceType.PAWN.value) {
            pieceType = PieceType.PAWN;
        }
        else if (value == PieceType.ROOK.value) {
            pieceType = PieceType.ROOK;
        }
        else if (value == PieceType.KNIGHT.value) {
            pieceType = PieceType.KNIGHT;
        }
        else if (value == PieceType.BISHOP.value) {
            pieceType = PieceType.BISHOP;
        }
        else if (value == PieceType.QUEEN.value) {
            pieceType = PieceType.QUEEN;
        }
        else if (value == PieceType.KING.value) {
            pieceType = PieceType.KING;
        }
        return pieceType;
    }
}

/**
 *
 * @author Gabor Kokeny
 */
class PieceColor {
    /**
     * Represents the LIGHT piece color
     *
     * @type {PieceColor}
     */
    public static LIGHT:PieceColor = new PieceColor("light", "w");

    /**
     * Represents the DARK piece color
     * @type {PieceColor}
     */
    public static DARK:PieceColor = new PieceColor("dark", "b");

    public name:string;

    public notation:string;

    constructor(name:string, notation:string) {
        this.name = name;
        this.notation = notation;
    }

    public toFENString():string {
        return this.notation;
    }
}

/**
 *
 * @author Gabor Kokeny
 */
class Piece extends Component {

    private pieceType:PieceType;

    private pieceColor:PieceColor;

    private notation:string;

    constructor(pieceType:PieceType, pieceColor:PieceColor) {
        super();
        this.pieceType = pieceType;
        this.pieceColor = pieceColor;

        this.notation = this.pieceColor.notation + this.pieceType.value;
    }


    protected createElement():HTMLElement {
        return document.createElement("figure");
    }

    protected initComponent() {
        this.addClass("piece-" + this.notation);
        this.setData("piece", this.notation);
    }

    /**
     * Convert piece to the FEN String
     *
     * @return {string}
     */
    public toFENString():string {
        var notation = this.pieceType.value;
        return PieceColor.LIGHT == this.pieceColor ? notation.toUpperCase() : notation.toLowerCase();
    }

    public static fromFENString(fenString:string):Piece {
        var pieceType = PieceType.fromValue(fenString);

        var piece:Piece = null;

        //black pieces use lowercase ("pnbrqk")
        if (fenString == fenString.toLowerCase()) {
            piece = new Piece(pieceType, PieceColor.DARK);
        }
        //White pieces are designated using upper-case letters ("PNBRQK")
        if (fenString == fenString.toUpperCase()) {
            piece = new Piece(pieceType, PieceColor.LIGHT);
        }

        return piece;
    }

}