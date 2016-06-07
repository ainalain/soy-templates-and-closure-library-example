goog.provide('tr.bProfile.iInfoEditor.InfoEditor');

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
tr.bProfile.iInfoEditor.InfoEditor = function() {
	goog.base(this);

	/**
	* Dom element
	* @type {Element}
	* @private
	*/
	this.infoElements_ = null;

	/**
	* Dom element
	* @type {Element}
	* @private
	*/
	this.infoValue_ = null;

	/**
	* Dom element
	* @type {Element}
	* @private
	*/
	this.editButton_ = null;

	/**
	* Dom element
	* @type {Element}
	* @private
	*/
	this.editElemets_ = null;

	/**
	* Dom element
	* @type {Element}
	* @private
	*/
	this.textField_ = null;

	/**
	* Dom element
	* @type {Element}
	* @private
	*/
	this.confirmButton_ = null;
	};

goog.inherits(tr.bProfile.iInfoEditor.InfoEditor, goog.ui.Component);

goog.scope(function() {
	var InfoEditor = tr.bProfile.iInfoEditor.InfoEditor;

	/**
	* CSS-class enum
	* @enum {string}
	*/
	InfoEditor.CssClass = {
		ROOT: 'i-info-editor',
		INFO_ELEMENTS: 'i-info-editor__info-elements',
		INFO_VALUE: 'i-info-editor__value',
		INFO_EDIT_BUTTON: 'i-info-editor__edit-button',
		EDIT_ELEMENTS: 'i-info-editor__edit-elements',
		EDIT_TEXTFIELD: 'i-info-editor__edit-input',
		EDIT_CONFIRM_BUTTON: 'i-info-editor__confirm-button',
		HIDDEN: 'g-hidden'
	};

	/** 
	*@override
	*/
	InfoEditor.prototype.decorateInternal = function(element) {
		goog.base(this, 'decorateInternal', element);

		this.infoElements_ = goog.dom.getElementByClass(
			InfoEditor.CssClass.INFO_ELEMENTS,
			element
			);

		this.infoValue_ = goog.dom.getElementByClass(
			InfoEditor.CssClass.INFO_VALUE,
			element
			);

		this.editButton_ = goog.dom.getElementByClass(
			InfoEditor.CssClass.INFO_EDIT_BUTTON,
			element
			);

		this.editElemets_ = goog.dom.getElementByClass(
			InfoEditor.CssClass.EDIT_ELEMENTS,
			element
			);

		this.textField_ = goog.dom.getElementByClass(
			InfoEditor.CssClass.EDIT_TEXTFIELD,
			element
			);

		this.confirmButton_ = goog.dom.getElementByClass(
			InfoEditor.CssClass.EDIT_CONFIRM_BUTTON,
			element
			);
	};

	/**
	* @override
	*/ 
	InfoEditor.prototype.enterDocument = function() {
		goog.base(this, 'enterDocument');

		var handler = this.getHandler();

		handler.listen(
			this.editButton_,
			goog.events.EventType.CLICK,
			this.editButtonPressHandler_
			);

		handler.listen(
			this.confirmButton_,
			goog.events.EventType.CLICK,
			this.confirmButtonPressHandler_
			);

		handler.listen(
			this.textField_,
			goog.events.EventType.KEYDOWN,
			this.textfieldKeyPressHandler_
			);

	};

	/**
	* @private
	*/ 
	InfoEditor.prototype.editButtonPressHandler_ = function() {
		this.textField_.value = this.infoValue_.innerText.trim();
		this.toggleElements_();
	};

	/**
	* @private
	*/ 
	InfoEditor.prototype.confirmButtonPressHandler_ = function() {
		var val_ = this.textField_.value.trim();

		if (val_) {
			this.infoValue_.innerText = val_;
		}

		this.toggleElements_();
	};

	/**
	* @private
	*/ 
	InfoEditor.prototype.toggleElements_ = function() {
		goog.dom.classlist.toggle(
			this.infoElements_,
			InfoEditor.CssClass.HIDDEN
			);

		goog.dom.classlist.toggle(
			this.editElemets_,
			InfoEditor.CssClass.HIDDEN
			);
	};

	/**
	* @private
	*/ 
	InfoEditor.prototype.textfieldKeyPressHandler_ = function(key) {

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