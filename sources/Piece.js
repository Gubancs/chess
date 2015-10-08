/**
 * Created by kokeny on 27/09/15.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="Component.ts"/>
var PieceType = (function () {
    function PieceType(value) {
        this.value = value;
    }
    PieceType.fromValue = function (value) {
        var pieceType = null;
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
    };
    PieceType.PAWN = new PieceType("p");
    PieceType.KNIGHT = new PieceType("n");
    PieceType.BISHOP = new PieceType("b");
    PieceType.ROOK = new PieceType("r");
    PieceType.QUEEN = new PieceType("q");
    PieceType.KING = new PieceType("k");
    return PieceType;
})();
/**
 *
 * @author Gabor Kokeny
 */
var PieceColor = (function () {
    function PieceColor(name, notation) {
        this.name = name;
        this.notation = notation;
    }
    PieceColor.prototype.toFENString = function () {
        return this.notation;
    };
    /**
     * Represents the LIGHT piece color
     *
     * @type {PieceColor}
     */
    PieceColor.LIGHT = new PieceColor("light", "w");
    /**
     * Represents the DARK piece color
     * @type {PieceColor}
     */
    PieceColor.DARK = new PieceColor("dark", "b");
    return PieceColor;
})();
/**
 *
 * @author Gabor Kokeny
 */
var Piece = (function (_super) {
    __extends(Piece, _super);
    function Piece(pieceType, pieceColor) {
        _super.call(this);
        this.pieceType = pieceType;
        this.pieceColor = pieceColor;
        this.notation = this.pieceColor.notation + this.pieceType.value;
    }
    Piece.prototype.createElement = function () {
        return document.createElement("figure");
    };
    Piece.prototype.initComponent = function () {
        this.addClass("piece-" + this.notation);
        this.setData("piece", this.notation);
    };
    /**
     * Convert piece to the FEN String
     *
     * @return {string}
     */
    Piece.prototype.toFENString = function () {
        var notation = this.pieceType.value;
        return PieceColor.LIGHT == this.pieceColor ? notation.toUpperCase() : notation.toLowerCase();
    };
    Piece.fromFENString = function (fenString) {
        var pieceType = PieceType.fromValue(fenString);
        var piece = null;
        //black pieces use lowercase ("pnbrqk")
        if (fenString == fenString.toLowerCase()) {
            piece = new Piece(pieceType, PieceColor.DARK);
        }
        //White pieces are designated using upper-case letters ("PNBRQK")
        if (fenString == fenString.toUpperCase()) {
            piece = new Piece(pieceType, PieceColor.LIGHT);
        }
        return piece;
    };
    return Piece;
})(Component);
//# sourceMappingURL=Piece.js.map