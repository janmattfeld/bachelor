/*!
 * SAP UI development toolkit for HTML5 (SAPUI5) (c) Copyright 2009-2014 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.ca.ui.HierarchyItem");jQuery.sap.require("sap.ca.ui.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.ca.ui.HierarchyItem",{metadata:{library:"sap.ca.ui",properties:{"icon":{type:"sap.ui.core.URI",group:"Appearance",defaultValue:null},"levelType":{type:"string",group:"Data",defaultValue:null},"title":{type:"string",group:"Data",defaultValue:null},"identifier":{type:"string",group:"Data",defaultValue:null},"link":{type:"string",group:"Data",defaultValue:null},"emphasized":{type:"boolean",group:"Data",defaultValue:false},"optional":{type:"boolean",group:"Data",defaultValue:false}},aggregations:{"_iconControl":{type:"sap.ui.core.Icon",multiple:false,visibility:"hidden"},"_levelTypeLabel":{type:"sap.m.Label",multiple:false,visibility:"hidden"},"_identifierLabel":{type:"sap.m.Label",multiple:false,visibility:"hidden"},"_titleLabel":{type:"sap.m.Label",multiple:false,visibility:"hidden"},"_linkControl":{type:"sap.m.Link",multiple:false,visibility:"hidden"}},events:{"linkPress":{}}}});sap.ca.ui.HierarchyItem.M_EVENTS={'linkPress':'linkPress'};
/*
 * Copyright (C) 2009-2013 SAP AG or an SAP affiliate company. All rights reserved
 */
jQuery.sap.require("sap.ui.layout.VerticalLayout");
sap.ca.ui.HierarchyItem.prototype.init=function(){};
sap.ca.ui.HierarchyItem.prototype._getIconControl=function(){var i=this.getAggregation("_iconControl");if(i==undefined){i=new sap.ui.core.Icon({src:this.getProperty("icon"),color:sap.ui.core.theming.Parameters.get("sapUiLightText")}).addStyleClass("sapCaUiHierarchyItemIcon");this.setAggregation("_iconControl",i)}return i};
sap.ca.ui.HierarchyItem.prototype._getLevelTypeLabel=function(){var l=this.getAggregation("_levelTypeLabel");if(l==undefined){l=new sap.m.Label({text:this.getProperty("levelType")}).addStyleClass("sapCaUiHierarchyItemLevelTypeLbl");this.setAggregation("_levelTypeLabel",l)}return l};
sap.ca.ui.HierarchyItem.prototype._getIdentifierLabel=function(){var i=this.getAggregation("_identifierLabel");if(i==undefined){i=new sap.m.Label({text:this.getProperty("identifier")}).addStyleClass("sapCaUiHierarchyItemIdentifierLbl");this.setAggregation("_identifierLabel",i)}return i};
sap.ca.ui.HierarchyItem.prototype._getTitleLabel=function(){var t=this.getAggregation("_titleLabel");if(t==undefined){t=new sap.m.Label({text:this.getProperty("title")}).addStyleClass("sapCaUiHierarchyItemTitleLbl");this.setAggregation("_titleLabel",t)}return t};
sap.ca.ui.HierarchyItem.prototype._getLinkControl=function(){var l=this.getAggregation("_linkControl");if(l==undefined){l=new sap.m.Link({text:this.getProperty("link")}).addStyleClass("sapCaUiHierarchyItemLink");l.attachPress(this.fireLinkPress,this);this.setAggregation("_linkControl",l)}return l};
