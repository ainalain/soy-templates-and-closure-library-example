goog.provide('iProfession.Profession');

goog.require('tr.bProfession.Template');
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
    
	/**
    * Event handler
    * @type goog.events.EventHandler
    * @private
    */
    this.handler_ = new goog.events.EventHandler(this);
}
// goog.ui.Component has to be replaced with goog.ui.Control ot cl.iControl.Control from clobl
goog.inherits(iProfession.Profession, goog.ui.Component);


goog.scope(function() {

var Profession = iProfession.Profession;
var professionTemplate = tr.bProfession.Template;


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
    this.dropdownButton_ = this.getElementByClass('info__profession__dropdown__chooseButton');
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
* In this version of goog.ui.Component inheritance
* button doesn't become disabled after profession has been chosen.
* Use cl.iControl.Control instead of goo.ui.Component
* to manage button's states.
* @private
*/
Profession.prototype.chooseProfession = function() {
    var profession = goog.dom.getRawTextContent(event.target);
    this.dropdownButton_.innerHTML = profession;
    goog.dom.classlist.add(this.dropdownButton_, 'show__myProf');
    this.toggleDropdown();
    
};

/**
* This functionality is temporary and has to be
* replaced with more convenient events handling.
* Use clobl library and cl.iControl.Control's functionality
* for events dispatching.
* @public
*/
Profession.prototype.restoreButton = function() {
    this.dropdownButton_.innerHTML = "Добавить профессию";
    goog.dom.classlist.remove(this.dropdownButton_, 'show__myProf');
       
};


}); //goog.scope