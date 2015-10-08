/**
 * Created by kokeny on 26/09/15.
 */
/**
 *
 * @author Gabor Kokeny
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
        //TODO init component
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
        //console.debug("[PgnViewer] - add component ", child);
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
        //console.debug("[PgnViewer] - remove component ", child);
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
//# sourceMappingURL=Component.js.map