goog.provide('tr.iCloseControl.View');

goog.require('goog.ui.ControlRenderer');
goog.require("goog.dom");
goog.require('goog.events.EventType');
goog.require('goog.dom.classlist');


/**
 * @param {Object=} opt_params
 * @extends {goog.ui.ControlRenderer}
 * @constructor
 */
tr.iCloseControl.View = function(opt_dom_helper) {
    goog.base(this);

    this.dom_helper = opt_dom_helper || null;
};
goog.inherits(tr.iCloseControl.View, goog.ui.ControlRenderer);
goog.addSingletonGetter(tr.iCloseControl.View);


goog.scope(function() {

    var View = tr.iCloseControl.View;

     /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'close-button'
    };

    /**
     * Add css class to root element
     * @param {string} cssClass
     */
    View.prototype.addCssClass = function(cssClass) {
        goog.dom.classlist.add(this.getElement(), cssClass);

        return this;
    };

    /**
     * Remove css class to root element
     * @param {string} cssClass
     */
    View.prototype.removeCssClass = function(cssClass) {
        goog.dom.classlist.remove(this.getElement(), cssClass);

        return this;
    };


    /**
    * dom element creation.
    * @public
    */
    View.prototype.createDom = function(control) {
        goog.base(this, 'createDom', control);
        var element = goog.dom.createDom('i', {class: "close-button close-button_disabled fa fa-times"});
        return element;

    };


    /**
    * Internal decorates the DOM element
    * @param {smControl.CloseControl} control
    */
    View.prototype.changeCssClass = function() {
        if (this.getState() === goog.ui.Component.State.DISABLED) {
            this.addCssClass('close-button_disabled');
        }
        else {
            this.removeCssClass('close-button_disabled');
            this.removeCssClass('goog-control-disabled');
        }

    };

}); //goog.scope
        