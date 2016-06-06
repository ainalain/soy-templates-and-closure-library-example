goog.provide('bTab.Tab');

goog.require('bTabs.Tabs.Template');
goog.require('goog.soy');
goog.require('goog.ui.Component');

var tabTemplate = bTabs.Tabs.Template;

/**
 * @param {Object=} opt_params
 * @extends {goog.ui.Component}
 * @constructor
 */
bTab.Tab = function(opt_params) {

	goog.base(this);

    /**
     * @private
     * @type {object}
     */
    this.params_ = opt_params || {};
   // this.panelContainerClass_ = opt_params['containerClass'];
   // this.parent_ = goog.dom.getElementByClass(this.panelContainerClass_);

	/**
    * Event handler
    * @type goog.events.EventHandler
    * @private
    */
    this.handler_ = new goog.events.EventHandler(this);

}
goog.inherits(bTab.Tab, goog.ui.Component);


goog.scope(function() {

    var Tab = bTab.Tab;
/**
* Template-based dom element creation.
* @public
*/
/*Tab.prototype.createDom = function() {
	goog.base(this, 'createDom');
	var self = this;
    var params = this.params_;
    var element = goog.soy.renderAsElement(tabTemplate.base, params);
    this.element_ = element; 
   // this.decorateInternal(element);
    
   
   goog.dom.appendChild(this.parent_, this.element_);

};*/

}); //goog.scope