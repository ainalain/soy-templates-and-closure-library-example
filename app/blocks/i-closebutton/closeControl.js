goog.provide('tr.iCloseControl.CloseControl');

goog.require('goog.ui.registry');
goog.require('goog.ui.Control');
goog.require('tr.iCloseControl.View');
goog.require("goog.events");
goog.require('goog.events.EventType');
goog.require('goog.dom.classlist');
//goog.require('iProfession.Profession');




/**
 * @param {Object=} opt_params
 * @extends {goog.ui.Control}
 * @constructor
 */
tr.iCloseControl.CloseControl = function(view, opt_domHelper) {
    goog.base(this, null, view, opt_domHelper);

    this.view_ = view;
    this.opt_domHelper_ = opt_domHelper || null;
    this.setSupportedState(goog.ui.Component.State.DISABLED, true);
    this.setDispatchTransitionEvents(goog.ui.Component.State.ENABLE, true);

    /**
    * Event handler
    * @type goog.events.EventHandler
    * @private
    */
    this.handler_ = new goog.events.EventHandler(this);
    
};

goog.inherits(tr.iCloseControl.CloseControl, goog.ui.Control);

goog.scope(function() {

    var CloseControl = tr.iCloseControl.CloseControl;
    var View = tr.iCloseControl.View;

    /**
     * Event enum
     * @enum {string}
     */
    CloseControl.Event = {
        CLICK:  goog.events.EventType.CLICK
    };


    /**
    * @override
    */
    CloseControl.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.handler_.listen(
            this.element_, 
            goog.events.EventType.CLICK,
            this.onClick
            );

    };

    /**
    * @param {goog.events.Event} e
    * @private
    */
    CloseControl.prototype.onClick = function(e) {
        e.stopPropagation();
        this.dispatchEvent(CloseControl.Event.CLICK);
        this.setState(goog.ui.Component.State.DISABLED, true);
        this.view_.setState(this, goog.ui.Component.State.DISABLED, true);  
    };

    /**
    * This functionality is temporary and has to be
    * replaced with more convenient events handling.
    * Use clobl library and cl.iControl.Control's functionality
    * for events dispatching.
    * @public
    */
    CloseControl.prototype.showCloseBtn = function(e) {
        e.stopPropagation();
        var element = this.getElement();
        goog.dom.classlist.remove(element, 'close-button_disabled');
        goog.dom.classlist.remove(element, 'goog-control-disabled');
    };

}); //goog.scope