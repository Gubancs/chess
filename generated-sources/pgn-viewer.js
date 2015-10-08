/**
 * Created by kokeny on 26/09/15.
 */
var Component = (function () {
    function Component() {
        this.children = new Array();
    }
    Component.prototype.render = function (htmlElement) {
    };
    Component.prototype.createElement = function () {
        return null;
    };
    Component.prototype.initComponent = function () {
    };
    Component.prototype.renderTo = function (targetHtmlElement) {
        // console.debug("[PgnViewer] - render component", this);
        var inner = targetHtmlElement == null;
        this.htmlElement = this.createElement();
        if (this.htmlElement == null) {
            this.htmlElement = targetHtmlElement;
        }
        this.render(this.htmlElement);
        if (this.htmlElement != targetHtmlElement) {
            targetHtmlElement.appendChild(this.htmlElement);
        }
        this.initComponent();
    };
    Component.prototype.add = function (child) {
        this.children.push(child);
        child.parent = this;
        child.renderTo(this.htmlElement);
        return this;
    };
    Component.prototype.addClass = function (cssClass) {
        this.htmlElement.classList.add(Component.CSS_PREFIX + cssClass);
    };
    Component.prototype.removeClass = function (cssClass) {
        this.htmlElement.classList.remove(Component.CSS_PREFIX + cssClass);
    };
    Component.prototype.getParent = function () {
        return this.parent;
    };
    Component.prototype.getChildren = function () {
        return this.children;
    };
    Component.prototype.remove = function (child) {
        var index = this.children.indexOf(child);
        if (index > -1) {
            this.children.slice(index, 1);
        }
        child.parent = null;
        if (this.htmlElement.hasChildNodes()) {
            this.htmlElement.removeChild(child.htmlElement);
        }
    };
    Component.prototype.rotate = function (deg) {
        this.htmlElement.style.transform = 'rotate(' + deg + 'deg)';
    };
    Component.prototype.setVisibility = function (visible) {
        if (visible) {
            this.htmlElement.style.visibility = "visible";
        }
        else {
            this.htmlElement.style.visibility = "hidden";
        }
    };
    Component.prototype.setData = function (attribute, value) {
        this.htmlElement.setAttribute("data-" + attribute, value);
    };
    Component.ID_SEQUENCE = 1;
    Component.CSS_PREFIX = "pgn-";
    Component.ID_PREFIX = "cmp-000";
    return Component;
})();
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
var PieceColor = (function () {
    function PieceColor(name, notation) {
        this.name = name;
        this.notation = notation;
    }
    PieceColor.prototype.toFENString = function () {
        return this.notation;
    };
    PieceColor.LIGHT = new PieceColor("light", "w");
    PieceColor.DARK = new PieceColor("dark", "b");
    return PieceColor;
})();
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
    Piece.prototype.toFENString = function () {
        var notation = this.pieceType.value;
        return PieceColor.LIGHT == this.pieceColor ? notation.toUpperCase() : notation.toLowerCase();
    };
    Piece.fromFENString = function (fenString) {
        var pieceType = PieceType.fromValue(fenString);
        var piece = null;
        if (fenString == fenString.toLowerCase()) {
            piece = new Piece(pieceType, PieceColor.DARK);
        }
        if (fenString == fenString.toUpperCase()) {
            piece = new Piece(pieceType, PieceColor.LIGHT);
        }
        return piece;
    };
    return Piece;
})(Component);
/**
 * Created by kokeny on 26/09/15.
 */
/// <reference path="Component.ts"/>
/// <reference path="Piece.ts"/>
var Square = (function (_super) {
    __extends(Square, _super);
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
    GamePosition.fromFENString = function (fenString) {
        console.debug("[PgnViewer] - create position from FEN string", fenString);
        var gamePosition = new GamePosition();
        gamePosition.fen = fenString;
        var fenFields = fenString.split(GamePosition.FIELD_SEP);
        var piecePlacement = fenFields[0];
        if (piecePlacement) {
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
        var activeColor = fenFields[1];
        if (activeColor) {
            gamePosition.activeColor = activeColor == "b" ? PieceColor.DARK : PieceColor.LIGHT;
        }
        var castlingAvailability = fenFields[2];
        if (castlingAvailability && castlingAvailability != '-') {
            if (castlingAvailability.indexOf("K") > -1) {
                gamePosition.whiteKingSideCastle = true;
            }
            if (castlingAvailability.indexOf("Q") > -1) {
                gamePosition.whiteQueenSideCastle = true;
            }
            if (castlingAvailability.indexOf("k") > -1) {
                gamePosition.blackKingSideCastle = true;
            }
            if (castlingAvailability.indexOf("q") > -1) {
                gamePosition.blackQueenSideCastle = true;
            }
        }
        if (fenFields[3]) {
            gamePosition.enPassantNotation = fenFields[3];
        }
        if (fenFields[4]) {
            gamePosition.halfMoveCounter = parseInt(fenFields[4], 10);
        }
        if (fenFields[5]) {
            gamePosition.numberOfMoves = parseInt(fenFields[5], 10);
        }
        return gamePosition;
    };
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
        fenFields.push(this.activeColor.toFENString());
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
        fenFields.push(this.enPassantNotation);
        fenFields.push(this.halfMoveCounter.toString());
        fenFields.push(this.numberOfMoves.toString());
        var fenString = fenFields.join(GamePosition.FIELD_SEP);
        console.debug("[PgnViewer] - FEN string : '%s'", fenString);
        return fenString;
    };
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
/**
 * Created by kokeny on 26/09/15.
 */
/// <reference path="../chessjs/chessjs.d.ts"/>
/// <reference path="ChessBoard.ts"/>
/// <reference path="Component.ts"/>
/// <reference path="GamePosition.ts"/>
var PgnViewer = (function (_super) {
    __extends(PgnViewer, _super);
    function PgnViewer() {
        _super.call(this);
    }
    PgnViewer.prototype.initComponent = function () {
        this.addClass("viewer");
        this.chessBoard = new ChessBoard();
        this.add(this.chessBoard);
        this.setVisibility(true);
    };
    PgnViewer.prototype.loadGame = function (pgn) {
        console.debug("[PgnViewer] - load game", pgn.join("\n"));
        var chess = new Chess();
        chess.load_pgn(pgn.join("\n"));
        console.debug("[Chess] - --------------------------------------------------------------------------------");
        console.debug("[Chess] - FEN string", chess.fen());
        console.debug("[Chess] - Moves", chess.moves());
        console.debug("[Chess] - History", chess.history());
        console.debug("[Chess] - Is in check : %s", chess.in_check());
        console.debug("[Chess] - Is in checkmate : %s", chess.in_checkmate());
        console.debug("[Chess] - Is in draw : %s", chess.in_draw());
        console.debug("[Chess] - Is in stalemate : %s", chess.in_stalemate());
        console.debug("[Chess] - Is in threefold repetition : %s", chess.in_threefold_repetition());
        console.debug("[Chess] - Insufficient material : %s", chess.insufficient_material());
        console.debug("[Chess] - Turn : %s", chess.turn());
        console.debug("[Chess] - Is game over : %s", chess.game_over());
        console.debug(chess.ascii());
        console.debug("[Chess] - --------------------------------------------------------------------------------");
        var chessBoard = this.chessBoard;
        chessBoard.setPosition(GamePosition.fromFENString(chess.fen()));
    };
    PgnViewer.prototype.flipBoard = function () {
        this.chessBoard.flipBoard();
    };
    PgnViewer.prototype.nextMove = function () {
    };
    PgnViewer.prototype.previousMove = function () {
    };
    PgnViewer.prototype.startPosition = function () {
    };
    PgnViewer.prototype.endPosition = function () {
    };
    PgnViewer.CSS_CLASS = "pgn-viewer";
    return PgnViewer;
})(Component);
window.addEventListener("load", function () {
    console.debug("[PgnViewer ®] -------------------------------------------------------------------------------");
    console.debug("[PgnViewer ®] - Detect pgn viewer elements started.");
    console.debug("[PgnViewer ®] -------------------------------------------------------------------------------");
    var nodeList = document.getElementsByClassName(PgnViewer.CSS_CLASS);
    console.debug("[PgnViewer] - Found (%s) pgn viewer element in the DOM.", nodeList.length);
    for (var i = 0; i < nodeList.length; i++) {
        if (nodeList[i] instanceof HTMLElement) {
            console.debug("[PgnViewer] - Initialize PgnViewer for node ->", nodeList[i]);
            var pgnViewer = new PgnViewer();
            var targetHtmlElement = nodeList[i];
            pgnViewer.renderTo(targetHtmlElement);
            var url = targetHtmlElement.getAttribute("data-url");
            if (url) {
                var req = new XMLHttpRequest();
                req.addEventListener("readystatechange", function () {
                    if (req.readyState == 4 && req.status == 200) {
                        var pgnText = req.responseText;
                        pgnViewer.loadGame(pgnText.split("\n"));
                    }
                });
                req.open("GET", url, true);
                req.send();
            }
        }
    }
    console.debug("[PgnViewer] - Detect pgn viewer elements finished.");
});
