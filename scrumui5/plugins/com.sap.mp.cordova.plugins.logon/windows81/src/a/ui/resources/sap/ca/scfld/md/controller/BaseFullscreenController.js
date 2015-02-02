/*
 * Copyright (C) 2009-2013 SAP AG or an SAP affiliate company. All rights reserved
 */
jQuery.sap.require("sap.ui.core.mvc.Controller");jQuery.sap.require("sap.ca.scfld.md.app.FullScreenHeaderFooterHelper");jQuery.sap.require("sap.ca.scfld.md.app.CommonHeaderFooterHelper");jQuery.sap.require("sap.ca.scfld.md.app.Application");sap.ui.core.mvc.Controller.extend("sap.ca.scfld.md.controller.BaseFullscreenController",{constructor:function(){this.oApplicationImplementation=sap.ca.scfld.md.app.Application.getImpl();var m=jQuery.proxy(function(){this.oRouter=sap.ui.core.UIComponent.getRouterFor(this);this.oApplicationFacade=this.oApplicationImplementation.oConfiguration.oApplicationFacade;this.oConnectionManager=this.oApplicationImplementation.getConnectionManager();this.oApplicationImplementation.setModels(this);this.oApplicationImplementation.defineFullscreenHeaderFooter(this);var M=jQuery.proxy(function(e){},this);if(typeof this.onBeforeShow==="function"){var A=jQuery.proxy(this.onBeforeShow,this);this.onBeforeShow=function(e){A(e);M(e)}}else{this.getView().addEventDelegate({onBeforeShow:jQuery.proxy(function(e){M()},this)})}},this);var a=jQuery.proxy(this.onInit,this);this.onInit=function(){m();a()}},onInit:function(){},getPage:function(){return sap.ca.scfld.md.app.CommonHeaderFooterHelper.getPageFromController(this)},getHeaderFooterOptions:function(){return null},setHeaderFooterOptions:function(o){if(!this._oFullScreenHeaderFooterHelper){this._oFullScreenHeaderFooterHelper=new sap.ca.scfld.md.app.FullScreenHeaderFooterHelper(this.oApplicationImplementation)}this._oFullScreenHeaderFooterHelper.setHeaderFooter(this,o)},setBtnEnabled:function(i,e){if(this._oControlStore.oButtonListHelper){this._oControlStore.oButtonListHelper.setBtnEnabled(i,e)}},setBtnText:function(i,t){if(this._oControlStore.oButtonListHelper){this._oControlStore.oButtonListHelper.setBtnText(i,t)}},_refresh:function(c,e,d){if(d&&d.context){this.getView().setBindingContext(d.context)}},_navBack:function(){window.history.back()},isMainScreen:function(){return true},getHeaderBtn:function(){if(this._oControlStore.oHeaderBtn){return this._oControlStore.oHeaderBtn}else{return null}}});