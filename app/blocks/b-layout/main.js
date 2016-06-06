goog.provide('bMain.Main');

goog.require('bTab.Tab');
goog.require('bNavPanel.NavPanel');
goog.require('smView.CloseView');
goog.require('smControl.CloseControl');
goog.require('iProfession.Profession');



var navpanel = new bNavPanel.NavPanel();
var panelElement = goog.dom.getElementByClass('b-menu');
navpanel.decorate(panelElement);




var tabs = new bTab.Tab();
var profsection = new iProfession.Profession();
var profsectionelement = goog.dom.getElementByClass('info__profession');
profsection.decorateInternal(profsectionelement);


var view = new smView.CloseView();
var closeBtn = new smControl.CloseControl(view);

var parentElement = closeBtn.getDomHelper().getElementByClass('info__profession__dropdown');
closeBtn.render(parentElement);

var dropContent = profsection.dropdownContent_;
goog.events.listen(dropContent, goog.events.EventType.CLICK, closeBtn.showCloseBtn, false, closeBtn);
goog.events.listen(closeBtn, goog.events.EventType.CLICK, profsection.restoreButton, false, profsection);

