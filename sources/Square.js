/**
 * Created by kokeny on 26/09/15.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="Component.ts"/>
/// <reference path="Piece.ts"/>
/**
 *
 * @aughor Gabor Kokeny
 */
var Square = (function (_super) {
    __extends(Square, _super);
    /**
     * Create a new instance of the Square
     * @param column
     * @param row
     */
    function Square(column, row) {
        _super.call(this);
        this._column = column;
        this._row = row;
        this._coordinate = Square.humanReadable(this).toLowerCase();
        this._color = this.row() % 2 == this.column() % 2 ? Square.LIGHT : Square.DARK;
    }
    Square.prototype.initComponent = function () {
        this.addClass("square");
        if (this._color == Square.LIGHT) {
            this.addClass(Square.LIGHT);
        }
        else {
            this.addClass(Square.DARK);
        }
        this.setData("square", this._coordinate);
    };
    Square.humanReadable = function (square) {
        var name = "";
        switch (square.row()) {
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
            case 7:
                name = "h";
                break;
        }
        return name + (square.column() + 1);
    };
    Square.prototype.showPiece = function (piece) {
        if (piece == null) {
            this.removePiece();
        }
        else {
            this.removePiece();
            this._currentPiece = piece;
            this.add(this._currentPiece);
        }
    };
    Square.prototype.clear = function () {
    };
    Square.prototype.row = function () {
        return this._row;
    };
    Square.prototype.column = function () {
        return this._column;
    };
    Square.prototype.color = function () {
        return this._color;
    };
    Square.prototype.coordinate = function () {
        return this._coordinate;
    };
    Square.prototype.highlight = function () {
        console.debug("[PgnViewer] - highlight square", this);
        this.addClass("highlight");
    };
    Square.prototype.unHighlight = function () {
        this.removeClass("highlight");
    };
    Square.prototype.removePiece = function () {
        if (this._currentPiece != null) {
            this.remove(this._currentPiece);
        }
        return this._currentPiece;
    };
    Square.prototype.currentPiece = function () {
        return this._currentPiece;
    };
    Square.prototype.createElement = function () {
        return document.createElement("div");
    };
    Square.DARK = "dark";
    Square.LIGHT = "light";
    return Square;
})(Component);
//# sourceMappingURL=Square.js.map