/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2014 SAP AG. All rights reserved
 */
sap.ui.define(['./library','./Element'],function(){"use strict";sap.ui.core.Element.extend("sap.ui.core.Title",{metadata:{library:"sap.ui.core",properties:{"text":{type:"string",group:"Appearance",defaultValue:null},"icon":{type:"sap.ui.core.URI",group:"Appearance",defaultValue:null},"level":{type:"sap.ui.core.TitleLevel",group:"Appearance",defaultValue:sap.ui.core.TitleLevel.Auto},"emphasized":{type:"boolean",group:"Appearance",defaultValue:false}}}});return sap.ui.core.Title},true);