/*
 * Copyright (C) 2009-2013 SAP AG or an SAP affiliate company. All rights reserved
 */
jQuery.sap.require("sap.ui.core.mvc.Controller");jQuery.sap.require("sap.ca.scfld.md.app.CommonHeaderFooterHelper");sap.ui.core.mvc.Controller.extend("sap.ca.scfld.md.controller.BaseDetailController",{constructor:function(){this.oApplicationImplementation=sap.ca.scfld.md.app.Application.getImpl();var m=jQuery.proxy(function(){this.oRouter=sap.ui.core.UIComponent.getRouterFor(this);this.oApplicationFacade=sap.ca.scfld.md.app.Application.getImpl().oConfiguration.oApplicationFacade;this.oConnectionManager=sap.ca.scfld.md.app.Application.getImpl().getConnectionManager();this.oApplicationImplementation.setModels(this);if(jQuery.device.is.phone){var p=this.getPage();p.setShowNavButton(true);p.attachNavButtonPress(this._navBack)}var p=this.getView().getContent()[0];p.setShowNavButton(jQuery.device.is.phone);p.attachNavButtonPress(this._navBack);var M=jQuery.proxy(function(e){this.oApplicationImplementation.defineDetailHeaderFooter(this)},this);if(typeof this.onBeforeShow==="function"){var A=jQuery.proxy(this.onBeforeShow,this);this.onBeforeShow=function(e){A(e);M(e)}}else{this.getView().addEventDelegate({onBeforeShow:jQuery.proxy(function(e){M()},this)})}},this);var a=jQuery.proxy(this.onInit,this);this.onInit=function(){m();a()}},onInit:function(){},getPage:function(){return sap.ca.scfld.md.app.CommonHeaderFooterHelper.getPageFromController(this)},getHeaderFooterOptions:function(){return null},setHeaderFooterOptions:function(o){this.oApplicationImplementation.oDHFHelper.setHeaderFooter(this,o)},setBtnEnabled:function(i,e){if(this._oControlStore.oButtonListHelper){this._oControlStore.oButtonListHelper.setBtnEnabled(i,e)}},setBtnText:function(i,t){if(this._oControlStore.oButtonListHelper){this._oControlStore.oButtonListHelper.setBtnText(i,t)}},getHeaderBtn:function(){if(this._oControlStore.oHeaderBtn){return this._oControlStore.oHeaderBtn}else{return null}},isMainScreen:function(){if(this._oControlStore.oBackButton){return false}return"X"},_navBack:function(){window.history.back()}});
