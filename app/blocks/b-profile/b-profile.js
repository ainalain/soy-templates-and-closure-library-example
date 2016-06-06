goog.provide('tr.bProfile');

goog.provide('tr.bEditElements.EditElements');
/**
 * creates instances of tr.lProfile.UserNameEdit and tr.lProfile.EmailEdit
*/
jQuery(function() {
	var domEditElements = goog.dom.getElementByClass(
		tr.bEditElements.EditElements.CssClass.ROOT
	);

	for (var i = 0; i < domEditElements.length; i++) {
		var editElements = new tr.bEditElements.EditElements();
		editElements.decorate(domEditElements[i]);		
	}
});