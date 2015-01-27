/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2014 SAP SE. All rights reserved
 */
jQuery.sap.require("sap.m.FlexBoxStylingHelper");jQuery.sap.declare("sap.m.FlexBoxRenderer");sap.m.FlexBoxRenderer={};
sap.m.FlexBoxRenderer.render=function(r,c){if(!c.getVisible()){return}if(!jQuery.support.flexBoxLayout&&!jQuery.support.newFlexBoxLayout&&!jQuery.support.ie10FlexBoxLayout){jQuery.sap.log.warning("This browser does not support Flexible Box Layouts natively.");sap.m.FlexBoxRenderer.usePolyfill=true}var h="";if(c.getDirection()==="Row"||c.getDirection()==="RowReverse"){if(c instanceof sap.m.VBox){jQuery.sap.log.error("Flex direction cannot be set to Row or RowReverse on VBox controls.")}else{h="sapMHBox"}}else if(c.getDirection()==="Column"||c.getDirection()==="ColumnReverse"){if(c instanceof sap.m.HBox){jQuery.sap.log.error("Flex direction cannot be set to Column or ColumnReverse on HBox controls.")}else{h="sapMVBox"}}var p=c.getParent();if(c.getParent()instanceof sap.m.FlexBox){r.addClass("sapMFlexItem");var l=c.getLayoutData();if(l instanceof sap.m.FlexItemData&&!sap.m.FlexBoxRenderer.usePolyfill){sap.m.FlexBoxStylingHelper.setFlexItemStyles(r,l)}if(p.getRenderType()==='List'){r.write('<li');r.writeClasses();r.writeStyles()}}if(c.getRenderType()==='List'){r.write('<ul')}else{r.write('<div')}r.writeControlData(c);r.addClass("sapMFlexBox");r.addClass(h);r.writeClasses();if(c.getWidth()){r.addStyle("width",c.getWidth())}if(c.getHeight()){r.addStyle("height",c.getHeight())}if(!sap.m.FlexBoxRenderer.usePolyfill){sap.m.FlexBoxStylingHelper.setFlexBoxStyles(r,c)}r.writeStyles();var t=c.getTooltip_AsString();if(t){r.writeAttributeEscaped("title",t)}r.write(">");var C=c.getItems();var w=true;for(var i=0;i<C.length;i++){if(C[i]instanceof sap.m.FlexBox||(C[i].getVisible!==undefined&&!C[i].getVisible())){w=false}else{w=true}if(w){if(c.getRenderType()==='List'){r.write('<li')}else{r.write('<div')}var l=C[i].getLayoutData();if(l instanceof sap.m.FlexItemData){if(l.getId()){r.write(" id='"+l.getId()+"'")}if(l.getStyleClass()){r.addClass(l.getStyleClass())}if(!sap.m.FlexBoxRenderer.usePolyfill){sap.m.FlexBoxStylingHelper.setFlexItemStyles(r,l)}if(C[i]instanceof sap.m.ScrollContainer){r.addStyle("height","100%")}r.writeStyles()}r.addClass("sapMFlexItem");r.writeClasses();r.write(">")}r.renderControl(C[i]);if(w){if(c.getRenderType()==='List'){r.write('</li>')}else{r.write('</div>')}}}if(c.getRenderType()==="List"){r.write("</ul>")}else{r.write("</div>")}};
