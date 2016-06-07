goog.provide('tr.bProfile.Profile');

goog.require('tr.bProfile.bEditElements.EditElements');
goog.require('goog.ui.Component');
goog.require('goog.dom');

/**
 * Profile edit component
 * @constructor
 * @extends {goog.ui.Component}
*/
tr.bProfile.Profile = function() {
	goog.base(this);
};
goog.inherits(tr.bProfile.Profile, goog.ui.Component);

goog.scope(function(){
	var Profile = tr.bProfile.Profile;
	var EditElements = tr.bProfile.bEditElements.EditElements;

	/**
	 * Internal decorates the DOM element
	 * @override
	 * @param {node} element
	*/
	Profile.prototype.decorateInternal = function(element) {
		goog.base(this, 'decorateInternal', element);

		this.initEditElements_();
	}

	/**
	 * @override	 
	*/
	Profile.prototype.enterDocument = function() {
		goog.base(this, 'enterDocument');
	};

	/*
	 * @private
	*/
	Profile.prototype.initEditElements_ = function() {
		var domEditableBlocks = goog.dom.getElementByClass(
			EditElements.CssClass.ROOT
		);

		var editElementsInstance;
		var domEditableBlock;

		for (var i = 0; i < domEditableBlocks.length; i++) {
			editElementsInstance = new EditElements();
			domEditableBlock = domEditableBlocks[i]

			editElementsInstance.decorate(domEditableBlock);
		}
	};

});