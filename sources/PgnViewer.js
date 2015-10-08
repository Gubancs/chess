/**
 * Created by kokeny on 26/09/15.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../chessjs/chessjs.d.ts"/>
/// <reference path="ChessBoard.ts"/>
/// <reference path="Component.ts"/>
/// <reference path="GamePosition.ts"/>
var PgnViewer = (function (_super) {
    __extends(PgnViewer, _super);
    function PgnViewer() {
        _super.call(this);
        //console.debug("[PgnViewer] - initialized successfully");
    }
    PgnViewer.prototype.initComponent = function () {
        this.addClass("viewer");
        this.chessBoard = new ChessBoard();
        this.add(this.chessBoard);
        this.setVisibility(true);
        //var ruyLopez = GamePosition.fromFENString('rnb1kbnr/pppp1ppp/8/4p3/5PPq/8/PPPPP2P/RNBQKBNR w KQkq - 1 3');
        //this.chessBoard.initStartPosition();
        //this.chessBoard.setPosition(ruyLopez);
        //this.chessBoard.flipBoard();
        //ruyLopez.toFENString();
        //this.chessBoard.clearBoard();
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
        // this.flipBoard();
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
//# sourceMappingURL=PgnViewer.js.map