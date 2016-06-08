goog.provide('tr.bMain.Main');

goog.require('tr.bTab.Tab');
goog.require('tr.bNavPanel.NavPanel');
goog.require('tr.iCloseControl.View');
goog.require('tr.iCloseControl.CloseControl');
goog.require('tr.bProfession.Profession');
goog.require('tr.bProfile.Profile');



var navpanel = new tr.bNavPanel.NavPanel();
var panelElement = goog.dom.getElementByClass('b-menu');
navpanel.decorate(panelElement);

var tabs = new tr.bTab.Tab();
var profsection = new tr.bProfession.Profession();
var profsectionelement = goog.dom.getElementByClass('info__profession');
profsection.decorate(profsectionelement);


var view = new tr.iCloseControl.View();
var closeBtn = new tr.iCloseControl.CloseControl(view);

var parentElement = closeBtn.getDomHelper().getElementByClass('info__profession__dropdown');
closeBtn.render(parentElement);

var dropContent = profsection.dropdownContent_;
goog.events.listen(dropContent, goog.events.EventType.CLICK, closeBtn.showCloseBtn, false, closeBtn);
goog.events.listen(closeBtn, goog.events.EventType.CLICK, profsection.restoreButton, false, profsection);

var profile = new tr.bProfile.Profile();
var domProfileBlock = goog.dom.getElementByClass('b-profile');
profile.decorate(domProfileBlock);