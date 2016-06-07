goog.provide('smControl.CloseControl');

goog.require('goog.ui.registry');
goog.require('goog.ui.Control');
goog.require('smView.CloseView');
goog.require("goog.events");
goog.require('goog.events.EventType');
goog.require('goog.dom.classlist');
//goog.require('iProfession.Profession');


var View = smView.CloseView;

/**
 * @param {Object=} opt_params
 * @extends {goog.ui.Control}
 * @constructor
 */
smControl.CloseControl = function(view, opt_domHelper) {
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

goog.inherits(smControl.CloseControl, goog.ui.Control);


/**
 * Event enum
 * @enum {string}
 */
smControl.CloseControl.Event = {
    CLICK:  goog.events.EventType.CLICK
};


/**
* @override
*/
smControl.CloseControl.prototype.enterDocument = function() {
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
smControl.CloseControl.prototype.onClick = function(e) {
    e.stopPropagation();
    this.dispatchEvent(smControl.CloseControl.Event.CLICK);
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
smControl.CloseControl.prototype.showCloseBtn = function(e) {
    e.stopPropagation();
    var element = this.getElement();
    goog.dom.classlist.remove(element, 'close-button_disabled');
    goog.dom.classlist.remove(element, 'goog-control-disabled');
};