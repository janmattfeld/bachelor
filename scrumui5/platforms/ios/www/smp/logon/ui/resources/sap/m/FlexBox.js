/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2014 SAP SE. All rights reserved
 */
jQuery.sap.declare("sap.m.FlexBox");jQuery.sap.require("sap.m.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.m.FlexBox",{metadata:{library:"sap.m",properties:{"visible":{type:"boolean",group:"Appearance",defaultValue:true},"height":{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:''},"width":{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:''},"displayInline":{type:"boolean",group:"Appearance",defaultValue:false},"direction":{type:"sap.m.FlexDirection",group:"Appearance",defaultValue:sap.m.FlexDirection.Row},"fitContainer":{type:"boolean",group:"Appearance",defaultValue:false},"renderType":{type:"sap.m.FlexRendertype",group:"Misc",defaultValue:sap.m.FlexRendertype.Div},"justifyContent":{type:"sap.m.FlexJustifyContent",group:"Appearance",defaultValue:sap.m.FlexJustifyContent.Start},"alignItems":{type:"sap.m.FlexAlignItems",group:"Appearance",defaultValue:sap.m.FlexAlignItems.Stretch}},defaultAggregation:"items",aggregations:{"items":{type:"sap.ui.core.Control",multiple:true,singularName:"item"}}}});jQuery.sap.require("sap.m.FlexBoxStylingHelper");
sap.m.FlexBox.prototype.init=function(){if(this instanceof sap.m.HBox&&(this.getDirection()!=="Row"||this.getDirection()!=="RowReverse")){this.setDirection('Row')}if(this instanceof sap.m.VBox&&(this.getDirection()!=="Column"||this.getDirection()!=="ColumnReverse")){this.setDirection('Column')}};
sap.m.FlexBox.prototype.setDisplayInline=function(i){var d="";this.setProperty("displayInline",i,false);if(i){d="inline-flex"}else{d="flex"}sap.m.FlexBoxStylingHelper.setStyle(null,this,"display",d);return this};
sap.m.FlexBox.prototype.setDirection=function(v){this.setProperty("direction",v,false);sap.m.FlexBoxStylingHelper.setStyle(null,this,"flex-direction",v);return this};
sap.m.FlexBox.prototype.setFitContainer=function(v){if(v&&!(this.getParent()instanceof sap.m.FlexBox)){jQuery.sap.log.info("FlexBox fitContainer set to true. Remember, if the FlexBox is inserted into a Page, the property 'enableScrolling' of the Page needs to be set to 'false' for the FlexBox to fit the entire viewport.");var $=this.$();$.css("width","auto");$.css("height","100%")}this.setProperty("fitContainer",v,false);return this};
sap.m.FlexBox.prototype.setJustifyContent=function(v){this.setProperty("justifyContent",v,false);sap.m.FlexBoxStylingHelper.setStyle(null,this,"justify-content",v);return this};
sap.m.FlexBox.prototype.setAlignItems=function(v){this.setProperty("alignItems",v,false);sap.m.FlexBoxStylingHelper.setStyle(null,this,"align-items",v);return this};
sap.m.FlexBox.prototype.setAlignContent=function(v){this.setProperty("alignContent",v,false);sap.m.FlexBoxStylingHelper.setStyle(null,this,"align-content",v);return this};
sap.m.FlexBox.prototype.onAfterRendering=function(){if(jQuery.support.useFlexBoxPolyfill){var c=this;var p=null;jQuery.sap.log.info("Check #"+c.getId()+" for nested FlexBoxes");for(p=c.getParent();p!==null&&p!==undefined&&(p instanceof sap.m.FlexBox||(p.getLayoutData()!==null&&p.getLayoutData()instanceof sap.m.FlexItemData));){c=p;p=c.getParent()}this.sanitizeChildren(this);this.renderFlexBoxPolyFill()}};
sap.m.FlexBox.prototype.sanitizeChildren=function(c){var C=c.getItems();for(var i=0;i<C.length;i++){if(C[i].getVisible===undefined||C[i].getVisible()){var $="";if(C[i]instanceof sap.m.FlexBox){$=C[i].$()}else{$=C[i].$().parent()}var d=C[i].getDomRef();$.width("auto");if(C[i]instanceof sap.m.FlexBox){this.sanitizeChildren(C[i])}}}};
sap.m.FlexBox.prototype.renderFlexBoxPolyFill=function(){var f=[];var o=[];var c=this.getItems();for(var i=0;i<c.length;i++){if(c[i].getVisible===undefined||c[i].getVisible()){var l=c[i].getLayoutData();if(l!=="undefined"&&l!==null&&l instanceof sap.m.FlexItemData){if(l.getGrowFactor()!==1){f.push(l.getGrowFactor())}else{f.push(1)}if(l.getOrder()!=0){o.push(l.getOrder())}else{o.push(0)}}}}if(f.length===0)f=null;if(o.length===0)o=null;if(this.getFitContainer()){this.setFitContainer(true)}var s={direction:this.getDirection(),alignItems:this.getAlignItems(),justifyContent:this.getJustifyContent(),flexMatrix:f,ordinalMatrix:o};sap.m.FlexBoxStylingHelper.applyFlexBoxPolyfill(this.getId(),s)};
