goog.provide('tr.bProfile.bMiddlePanel.MiddlePanel');

goog.require('goog.dom.classes');
goog.require('goog.dom.classlist');
goog.require('goog.events');
goog.require('goog.soy');
goog.require('goog.ui.Component');

/**
* Component that decorates the middle panel
* @constructor
* @extends {goog.ui.Component}
*/
tr.bProfile.bMiddlePanel.MiddlePanel = function() {
	goog.base(this);

	/**
	* Dom element
	* @type {Element}
	* @private
	*/
	this.iconTrusted_ = null;

	/**
	* Dom element
	* @type {Element}
	* @private
	*/
	this.iconProfile_ = null;

	/**
	* Dom element
	* @type {Element}
	* @private
	*/
	this.domCommentsBlock_ = null;

	/**
	* Dom element
	* @type {Element}
	* @private
	*/
	this.domContactsBlock_ = null;

	};

goog.inherits(tr.bProfile.bMiddlePanel.MiddlePanel, goog.ui.Component);

goog.scope(function() {
	var MiddlePanel = tr.bProfile.bMiddlePanel.MiddlePanel;

	/**
	* CSS-class enum
	* @enum {string}
	*/
	MiddlePanel.CssClass = {
		ROOT: 'b-middle-panel',
		ICON_TRUSTED: 'b-middle-panel__icon-trusted',
		ICON_PROFILE: 'b-middle-panel__icon-profile',
		COMMENTS_BLOCK: 'b-profile__comments',
		CONTACTS_BLOCK: 'b-profile__contacts',
		HIDDEN: 'g-hidden'
	};

	/** 
	*@override
	*/
	MiddlePanel.prototype.decorateInternal = function(element) {
		goog.base(this, 'decorateInternal', element);

		this.iconTrusted_ = goog.dom.getElementByClass(
			MiddlePanel.CssClass.ICON_TRUSTED,
			element
			);

		this.iconProfile_ = goog.dom.getElementByClass(
			MiddlePanel.CssClass.ICON_PROFILE,
			element
			);

		this.domCommentsBlock_ = goog.dom.getElementByClass(
			MiddlePanel.CssClass.COMMENTS_BLOCK
			);

		this.domContactsBlock_ = goog.dom.getElementByClass(
			MiddlePanel.CssClass.CONTACTS_BLOCK
			);
	};

	/**
	* @override
	*/ 
	MiddlePanel.prototype.enterDocument = function() {
		goog.base(this, 'enterDocument');

		var handler = this.getHandler();

		handler.listen(
			this.iconTrusted_,
			goog.events.EventType.CLICK,
			this.showCommentsBlock_
			);

		handler.listen(
			this.iconProfile_,
			goog.events.EventType.CLICK,
			this.showContactsBlock_
			);

	};

	/**
	* @private
	*/ 
	MiddlePanel.prototype.showCommentsBlock_ = function() {
		goog.dom.classlist.add(
			this.domContactsBlock_,
			MiddlePanel.CssClass.HIDDEN
			);

		goog.dom.classlist.remove(
			this.domCommentsBlock_,
			MiddlePanel.CssClass.HIDDEN
			);
	};

	/**
	* @private
	*/ 
	MiddlePanel.prototype.showContactsBlock_ = function() {
		goog.dom.classlist.add(
			this.domCommentsBlock_,
			MiddlePanel.CssClass.HIDDEN
			);

		goog.dom.classlist.remove(
			this.domContactsBlock_,
			MiddlePanel.CssClass.HIDDEN
			);
	};

});