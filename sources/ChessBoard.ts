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

/// <reference path="Square.ts"/>
/// <reference path="Component.ts"/>
/// <reference path="GamePosition.ts"/>
/// <reference path="../chessjs/chessjs.d.ts"/>

class ChessBoard extends Component {

    public static SIZE:number = 8;

    private chess:Chess;

    private currentPosition:GamePosition;

    constructor(fen?:string) {
        super();
        this.chess = new Chess(fen);
    }

    protected render(htmlElement:HTMLElement):void {
        super.render(htmlElement);
    }

    protected initComponent():void {
        this.addClass("chessboard");

        for (var column = ChessBoard.SIZE; column > 0; column--) {
            for (var row = 0; row < ChessBoard.SIZE; row++) {
                var square:Square = new Square(column - 1, row);
                this.add(square);
            }
        }
    }

    public clearBoard():void {
        this.setPosition(GamePosition.empty());
    }

    private getSquare(coordinate:string):Square {
        var square:Square = null;
        this.getChildren().forEach(function (child) {
            if (child instanceof  Square && child.coordinate() == coordinate.toUpperCase()) {
                square = child;
            }
        });
        return square;
    }

    private findSquare(column:number, row:number):Square {
        var square:Square = null;
        this.getChildren().forEach(function (child) {
            if (child instanceof  Square && child.row() == row && child.column() == column) {
                square = child;
            }
        });
        return square;
    }

    public initStartPosition():void {
        this.setPosition(GamePosition.startPosition());
    }


    protected createElement():HTMLElement {
        return document.createElement("div");
    }

    public move(from:string, to:string):void {

        var fromSquare:Square = this.getSquare(from);
        var toSquare:Square = this.getSquare(to);

        fromSquare.highlight();
        toSquare.highlight();

        var piece = fromSquare.currentPiece();
        fromSquare.removePiece();

        toSquare.showPiece(piece);
    }

    public setPosition(position:GamePosition):void {
        console.debug("[PgnViewer] - set position", position);
        this.currentPosition = position;

        var me = this;
        position.forEach(function (row:number, col:number, piece:Piece) {
            var square = me.findSquare(row, col);
            square.showPiece(piece);
        });

    }

    public flipBoard():void {
        this.rotate(180);
        this.getChildren().forEach(function (child:Component) {
            child.rotate(180);
        });
    }
}