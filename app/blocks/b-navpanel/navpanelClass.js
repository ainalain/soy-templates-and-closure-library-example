goog.provide('tr.bNavPanel.NavPanel');

goog.require('tr.bNavbar.Template');
goog.require('goog.soy');
goog.require('goog.ui.Component');
goog.require('goog.events');
goog.require('goog.events.EventType');
goog.require('goog.dom.classlist');


/**
 * @param {Object=} opt_params
 * @extends {goog.ui.Component}
 * @constructor
 */
tr.bNavPanel.NavPanel = function(opt_params) {

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
goog.inherits(tr.bNavPanel.NavPanel, goog.ui.Component);

goog.scope(function() {


var navPanel = tr.bNavPanel.NavPanel;
var navbarTemplate = tr.bNavbar.Template;

/**
* Css class enum
* @enum {string}
*/

navPanel.CssClass = {
    ROOT: 'b-menu',
    ITEM: 'b-menu__items-list__item',
    CURRENT_ITEM: 'b-menu__items-list__item_current',
    LINK: 'link-menu',
    ACTIVE_LINK: 'link-menu_active'
};


/**
     * Internal decorates the DOM element
     * @param {Node} element
     */
navPanel.prototype.decorateInternal = function(element) {
    goog.base(this, 'decorateInternal', element);

    this.initElements_();
    
};

/**
     * Init dom elements
     * @private
     */
navPanel.prototype.initElements_ = function() {
    this.currentItem_ = this.getElementByClass(
        navPanel.CssClass.CURRENT_ITEM
    );
    this.activeLink_ = this.getElementByClass(
        navPanel.CssClass.ACTIVE_LINK
    );

}


navPanel.prototype.enterDocument = function() {
    goog.base(this, 'enterDocument');
    var self = this;
    this.handler_.listen(
            self.element_,
            goog.events.EventType.CLICK,
            self.toggleTabs
            
        );

};


navPanel.prototype.toggleTabs = function(e) {
    var elem = e.target;
    
    while (!(goog.dom.classlist.contains(elem, navPanel.CssClass.LINK) || 
        goog.dom.classlist.contains(elem, navPanel.CssClass.ACTIVE_LINK))) {
        var newElem = goog.dom.getFirstElementChild(elem);
        elem = newElem;

    }

    if (goog.dom.classlist.contains(elem, navPanel.CssClass.ACTIVE_LINK)) {
        return;
    }
  
    var currentItem = goog.dom.getAncestorByTagNameAndClass(elem, 'li');
    var currentTabClass = "tab__" + elem.getAttribute("href").slice(1);
    var currentTab = goog.dom.getElementByClass(currentTabClass);
    var oldTab = goog.dom.getElementByClass('tab_active');
    goog.dom.classlist.swap(this.currentItem_, navPanel.CssClass.CURRENT_ITEM, navPanel.CssClass.ITEM);
    goog.dom.classlist.swap(this.activeLink_, navPanel.CssClass.ACTIVE_LINK, navPanel.CssClass.LINK);
    goog.dom.classlist.swap(elem, navPanel.CssClass.LINK, navPanel.CssClass.ACTIVE_LINK);
    goog.dom.classlist.swap(currentItem, navPanel.CssClass.ITEM, navPanel.CssClass.CURRENT_ITEM);
    goog.dom.classlist.remove(oldTab, 'tab_active');
    goog.dom.classlist.add(currentTab, 'tab_active');


    this.activeLink_ = elem;
    this.currentItem_ = currentItem;

};

}); //goog.scope