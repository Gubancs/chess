/**
 * Created by kokeny on 26/09/15.
 */


/**
 *
 * @author Gabor Kokeny
 */
class Component {

    private static ID_SEQUENCE:number = 1;

    private static CSS_PREFIX:string = "pgn-";

    private static ID_PREFIX:string = "cmp-000";

    private parent:Component;

    private children:Array<Component>;

    private htmlElement:HTMLElement;

    private id:string;

    private size:number;

    constructor() {
        this.children = new Array<Component>();
    }

    protected render(htmlElement:HTMLElement):void {
    }

    protected createElement():HTMLElement {
        return null;
    }

    protected initComponent():void {
        //TODO init component
    }


    public renderTo(targetHtmlElement:HTMLElement):void {
        // console.debug("[PgnViewer] - render component", this);

        var inner = targetHtmlElement == null;

        this.htmlElement = this.createElement();

        if (this.htmlElement == null) {
            this.htmlElement = targetHtmlElement;
        }

        this.render(this.htmlElement);

        if(this.htmlElement != targetHtmlElement){
            targetHtmlElement.appendChild(this.htmlElement);
        }

        this.initComponent();
    }


    protected add(child:Component):Component {
        //console.debug("[PgnViewer] - add component ", child);
        this.children.push(child);
        child.parent = this;

        child.renderTo(this.htmlElement);

        return this;
    }

    protected addClass(cssClass:string):void {
        this.htmlElement.classList.add(Component.CSS_PREFIX + cssClass);
    }

    protected removeClass(cssClass:string):void {
        this.htmlElement.classList.remove(Component.CSS_PREFIX + cssClass);
    }

    protected getParent():Component {
        return this.parent;
    }

    protected getChildren():Array<Component> {
        return this.children;
    }

    public remove(child:Component):void {
        //console.debug("[PgnViewer] - remove component ", child);
        var index:number = this.children.indexOf(child);

        if (index > -1) {
            this.children.slice(index, 1);
        }

        child.parent = null;

        if (this.htmlElement.hasChildNodes()) {
            this.htmlElement.removeChild(child.htmlElement);
        }
    }

    rotate(deg:number):void {
        this.htmlElement.style.transform = 'rotate(' + deg + 'deg)';
    }

   public  setVisibility(visible:boolean):void {
        if (visible) {
            this.htmlElement.style.visibility = "visible";
        } else {
            this.htmlElement.style.visibility = "hidden";
        }
    }

    protected setData(attribute:string, value:string):void {
        this.htmlElement.setAttribute("data-" + attribute, value);
    }
}