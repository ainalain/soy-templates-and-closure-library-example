goog.provide('iProfession.Profession');

goog.require('bUser.Profession.Template');
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
 iProfession.Profession = function(opt_params) {

	goog.base(this);

    /**
     * @private
     * @type {object}
     */
    this.params_ = opt_params || {};
    //this.panelContainerClass_ = opt_params['containerClass'];
  //  this.parent_ = goog.dom.getElementByClass(this.panelContainerClass_);

	/**
    * Event handler
    * @type goog.events.EventHandler
    * @private
    */
    this.handler_ = new goog.events.EventHandler(this);
}
goog.inherits(iProfession.Profession, goog.ui.Component);


goog.scope(function() {

var Profession = iProfession.Profession;
var professionTemplate = bUser.Profession.Template;

/**
* Template-based dom element creation.
* @public
*/
/*Profession.prototype.createDom = function() {
    goog.base(this, 'createDom');
    var self = this;
    var params = this.params_;
    var element = goog.soy.renderAsElement(professionTemplate.base, params);
    this.element_ = element; 
    this.decorateInternal(element);
       
    goog.dom.appendChild(this.parent_, this.element_);

};*/


/**
 * Internal decorates the DOM element
 * @param {Node} element
 */
Profession.prototype.decorateInternal = function(element) {
    goog.base(this, 'decorateInternal', element);

    this.initElements_();

};


/**
     * Init dom elements
     * @private
     */
Profession.prototype.initElements_ = function() {
    this.dropdownButton_ = this.getElementByClass('chooseProf');
    this.dropdownContent_ = this.getElementByClass('dropdown-content');
    this.DropdownProfession_ = this.getElementByClass('info__profession__dropdown');
       
};

/**
* @override
*/
Profession.prototype.enterDocument = function() {
    goog.base(this, 'enterDocument');
    var self = this;
    this.handler_.listen(
            self.dropdownButton_,
            goog.events.EventType.CLICK,
            self.toggleDropdown
            
        );
    this.initChoiceListener_();
   
};


/**
* @private
*/
Profession.prototype.toggleDropdown = function() {
    goog.dom.classlist.toggle(this.dropdownContent_, 'show');
};


/**
* @private
*/
Profession.prototype.initChoiceListener_ = function() {
    this.handler_.listen(
            this.dropdownContent_,
            goog.events.EventType.CLICK,
            this.chooseProfession
        );
};


/**
* @private
*/
Profession.prototype.chooseProfession = function() {
    var profession = goog.dom.getRawTextContent(event.target);
    this.dropdownButton_.innerHTML = profession;
    goog.dom.classlist.add(this.dropdownButton_, 'show__myProf');
    this.toggleDropdown();
    
};

/**
* @public
*/
Profession.prototype.restoreButton = function() {
    this.dropdownButton_.innerHTML = "Add profession";
    goog.dom.classlist.remove(this.dropdownButton_, 'show__myProf');
    this.toggleDropdown();
    
};

}); //goog.scope