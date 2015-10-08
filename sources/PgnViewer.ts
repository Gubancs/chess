/**
 * Created by kokeny on 26/09/15.
 */

/// <reference path="../chessjs/chessjs.d.ts"/>
/// <reference path="ChessBoard.ts"/>
/// <reference path="Component.ts"/>
/// <reference path="GamePosition.ts"/>


class PgnViewer extends Component {

    public static CSS_CLASS:string = "pgn-viewer";

    public chessBoard:ChessBoard;

    constructor() {
        super();

        //console.debug("[PgnViewer] - initialized successfully");
    }

    protected initComponent():void {
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


    }


    public loadGame(pgn:string[]):void {

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

    }

    public flipBoard():void {
        this.chessBoard.flipBoard();
    }

    public nextMove():void {

    }

    public previousMove():void {

    }

    public startPosition():void {

    }

    public endPosition():void {

    }
}


window.addEventListener("load", function () {
    console.debug("[PgnViewer ®] -------------------------------------------------------------------------------");
    console.debug("[PgnViewer ®] - Detect pgn viewer elements started.");
    console.debug("[PgnViewer ®] -------------------------------------------------------------------------------");
    var nodeList = document.getElementsByClassName(PgnViewer.CSS_CLASS);

    console.debug("[PgnViewer] - Found (%s) pgn viewer element in the DOM.", nodeList.length);
    for (var i = 0; i < nodeList.length; i++) {

        if (nodeList[i] instanceof  HTMLElement) {
            console.debug("[PgnViewer] - Initialize PgnViewer for node ->", nodeList[i]);
            var pgnViewer = new PgnViewer();

            var targetHtmlElement = <HTMLElement>nodeList[i];

            pgnViewer.renderTo(targetHtmlElement);

            var url = targetHtmlElement.getAttribute("data-url");

            if (url) {
                var req = new XMLHttpRequest();

                req.addEventListener("readystatechange", function () {
                    if (req.readyState == 4 && req.status == 200) {
                        var pgnText:string = req.responseText;
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
