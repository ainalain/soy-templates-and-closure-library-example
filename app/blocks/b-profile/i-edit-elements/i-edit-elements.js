goog.provide('tr.bProfile.iEditElements.EditElements');

goog.require('goog.dom.classes');
goog.require('goog.dom.classlist');
goog.require('goog.events');
goog.require('goog.soy');
goog.require('goog.ui.Component');

/**
* Component that decorates editable blocks
* @constructor
* @extends {goog.ui.Component}
*/
tr.bProfile.iEditElements.EditElements = function() {
	goog.base(this);

	/**
	* Dom element
	* @type {Element}
	* @private
	*/
	this.nameInfoElements_ = null;

	/**
	* Dom element
	* @type {Element}
	* @private
	*/
	this.nameInfoText_ = null;

	/**
	* Dom element
	* @type {Element}
	* @private
	*/
	this.nameInfoEditButton_ = null;

	/**
	* Dom element
	* @type {Element}
	* @private
	*/
	this.nameEditElements_ = null;

	/**
	* Dom element
	* @type {Element}
	* @private
	*/
	this.nameEditTextfield_ = null;

	/**
	* Dom element
	* @type {Element}
	* @private
	*/
	this.nameEditConfirmButton_ = null;
	};

goog.inherits(tr.bProfile.iEditElements.EditElements, goog.ui.Component);

goog.scope(function() {
	var EditElements = tr.bProfile.iEditElements.EditElements;

	/**
	* CSS-class enum
	* @enum {string}
	*/
	EditElements.CssClass = {
		ROOT: 'b-edit-elements',
		INFO_ELEMENTS: 'b-edit-elements__info-elements',
		INFO_TEXT: 'b-edit-elements__value',
		INFO_EDIT_BUTTON: 'b-edit-elements__edit-button',
		EDIT_ELEMENTS: 'b-edit-elements__edit-elements',
		EDIT_TEXTFIELD: 'b-edit-elements__edit-input',
		EDIT_CONFIRM_BUTTON: 'b-edit-elements__confirm-button',
		HIDDEN: 'g-hidden'
	};

	/** 
	*@override
	*/
	EditElements.prototype.decorateInternal = function(element) {
		goog.base(this, 'decorateInternal', element);

		this.nameInfoElements_ = goog.dom.getElementByClass(
			EditElements.CssClass.INFO_ELEMENTS,
			element
			);

		this.nameInfoText_ = goog.dom.getElementByClass(
			EditElements.CssClass.INFO_TEXT,
			element
			);

		this.nameInfoEditButton_ = goog.dom.getElementByClass(
			EditElements.CssClass.INFO_EDIT_BUTTON,
			element
			);

		this.nameEditElements_ = goog.dom.getElementByClass(
			EditElements.CssClass.EDIT_ELEMENTS,
			element
			);

		this.nameEditTextfield_ = goog.dom.getElementByClass(
			EditElements.CssClass.EDIT_TEXTFIELD,
			element
			);

		this.nameEditConfirmButton_ = goog.dom.getElementByClass(
			EditElements.CssClass.EDIT_CONFIRM_BUTTON,
			element
			);
	};

	/**
	* @override
	*/ 
	EditElements.prototype.enterDocument = function() {
		goog.base(this, 'enterDocument');

		var handler = this.getHandler();

		handler.listen(
			this.nameInfoEditButton_,
			goog.events.EventType.CLICK,
			this.editButtonPressHandler_
			);

		handler.listen(
			this.nameEditConfirmButton_,
			goog.events.EventType.CLICK,
			this.confirmButtonPressHandler_
			);

		handler.listen(
			this.nameEditTextfield_,
			goog.events.EventType.KEYDOWN,
			this.textfieldKeyPressHandler_
			);

	};

	/**
	* @private
	*/ 
	EditElements.prototype.editButtonPressHandler_ = function() {
		this.nameEditTextfield_.value = this.nameInfoText_.innerText.trim();
		this.toggleElements_();
	};

	/**
	* @private
	*/ 
	EditElements.prototype.confirmButtonPressHandler_ = function() {
		var val_ = this.nameEditTextfield_.value.trim();

		if (val_) {
			this.nameInfoText_.innerText = val_;
		}

		this.toggleElements_();
	};

	/**
	* @private
	*/ 
	EditElements.prototype.toggleElements_ = function() {
		goog.dom.classlist.toggle(
			this.nameInfoElements_,
			EditElements.CssClass.HIDDEN
			);

		goog.dom.classlist.toggle(
			this.nameEditElements_,
			EditElements.CssClass.HIDDEN
			);
	};

	/**
	* @private
	*/ 
	EditElements.prototype.textfieldKeyPressHandler_ = function(key) {

		if (key.keyCode == 13) {
			this.confirmButtonPressHandler_();
			return;
		}

		if (key.keyCode == 27) {
			this.toggleElements_();
			return;
		}
	};

});