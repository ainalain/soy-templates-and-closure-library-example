goog.provide('tr.bTab.Tab');

goog.require('tr.bTabs.Template');
goog.require('goog.soy');
goog.require('goog.ui.Component');

var tabTemplate = tr.bTabs.Template;

/**
 * @param {Object=} opt_params
 * @extends {goog.ui.Component}
 * @constructor
 */
tr.bTab.Tab = function(opt_params) {

	goog.base(this);

    /**
     * @private
     * @type {object}
     */
    this.params_ = opt_params || {};
   
	/**
    * Event handler
    * @type goog.events.EventHandler
    * @private
    */
    this.handler_ = new goog.events.EventHandler(this);

}
goog.inherits(tr.bTab.Tab, goog.ui.Component);


goog.scope(function() {

    var Tab = tr.bTab.Tab;

}); //goog.scope