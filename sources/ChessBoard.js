/**
 * Copyright 2015-2016 Gabor Kokeny
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 * documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to
 * whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the
 * Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
 * BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="Square.ts"/>
/// <reference path="Component.ts"/>
/// <reference path="GamePosition.ts"/>
/// <reference path="../chessjs/chessjs.d.ts"/>
var ChessBoard = (function (_super) {
    __extends(ChessBoard, _super);
    function ChessBoard(fen) {
        _super.call(this);
        this.chess = new Chess(fen);
    }
    ChessBoard.prototype.render = function (htmlElement) {
        _super.prototype.render.call(this, htmlElement);
    };
    ChessBoard.prototype.initComponent = function () {
        this.addClass("chessboard");
        for (var column = ChessBoard.SIZE; column > 0; column--) {
            for (var row = 0; row < ChessBoard.SIZE; row++) {
                var square = new Square(column - 1, row);
                this.add(square);
            }
        }
    };
    ChessBoard.prototype.clearBoard = function () {
        this.setPosition(GamePosition.empty());
    };
    ChessBoard.prototype.getSquare = function (coordinate) {
        var square = null;
        this.getChildren().forEach(function (child) {
            if (child instanceof Square && child.coordinate() == coordinate.toUpperCase()) {
                square = child;
            }
        });
        return square;
    };
    ChessBoard.prototype.findSquare = function (column, row) {
        var square = null;
        this.getChildren().forEach(function (child) {
            if (child instanceof Square && child.row() == row && child.column() == column) {
                square = child;
            }
        });
        return square;
    };
    ChessBoard.prototype.initStartPosition = function () {
        this.setPosition(GamePosition.startPosition());
    };
    ChessBoard.prototype.createElement = function () {
        return document.createElement("div");
    };
    ChessBoard.prototype.move = function (from, to) {
        var fromSquare = this.getSquare(from);
        var toSquare = this.getSquare(to);
        fromSquare.highlight();
        toSquare.highlight();
        var piece = fromSquare.currentPiece();
        fromSquare.removePiece();
        toSquare.showPiece(piece);
    };
    ChessBoard.prototype.setPosition = function (position) {
        console.debug("[PgnViewer] - set position", position);
        this.currentPosition = position;
        var me = this;
        position.forEach(function (row, col, piece) {
            var square = me.findSquare(row, col);
            square.showPiece(piece);
        });
    };
    ChessBoard.prototype.flipBoard = function () {
        this.rotate(180);
        this.getChildren().forEach(function (child) {
            child.rotate(180);
        });
    };
    ChessBoard.SIZE = 8;
    return ChessBoard;
})(Component);
//# sourceMappingURL=ChessBoard.js.map