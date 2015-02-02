/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./ComboBoxBase','./ComboBoxRenderer','./library'],function(q,C,a,l){"use strict";var b=C.extend("sap.m.ComboBox",{metadata:{library:"sap.m",properties:{selectedKey:{type:"string",group:"Data",defaultValue:null},selectedItemId:{type:"string",group:"Misc",defaultValue:null}},associations:{selectedItem:{type:"sap.ui.core.Item",multiple:false}},events:{selectionChange:{parameters:{selectedItem:{type:"sap.ui.core.Item"}}}}}});b.prototype._getSelectedListItem=function(){var i=this.getSelectedItem();return(i&&i.data(sap.m.ComboBoxBaseRenderer.CSS_CLASS+"ListItem"))||null};b.prototype._createPopover=function(){var p=new sap.m.Popover({showHeader:false,placement:sap.m.PlacementType.Vertical,offsetX:0,offsetY:0,initialFocus:this,bounce:false});this._decoratePopover(p);return p};b.prototype._decoratePopover=function(p){var t=this;p._removeArrow=function(){this._marginTop=0;this._marginLeft=0;this._marginRight=0;this._marginBottom=0;this._arrowOffset=0;this._offsets=["0 0","0 0","0 0","0 0"]};p._setPosition=function(){this._myPositions=["begin bottom","begin center","begin top","end center"];this._atPositions=["begin top","end center","begin bottom","begin center"]};p._setArrowPosition=function(){};p.open=function(){return this.openBy(t.getFocusDomRef())}};b.prototype.onAfterRenderingPopover=function(){var p=this.getPicker();p._removeArrow();p._setPosition()};b.prototype._createDialog=function(){var c=sap.m.ComboBoxBaseRenderer.CSS_CLASS;var d=new sap.m.Dialog({stretchOnPhone:true,customHeader:new sap.m.Bar({contentLeft:new sap.m.InputBase({value:this.getSelectedItem().getText(),width:"100%",editable:false}).addStyleClass(c+"Input")}).addStyleClass(c+"Bar")});d.getAggregation("customHeader").attachBrowserEvent("tap",function(){d.close()},this);return d};b.prototype.onBeforeOpenDialog=function(){var h=this.getPicker().getCustomHeader();h.getContentLeft()[0].setValue(this.getSelectedItem().getText())};b.prototype.onBeforeRendering=function(){C.prototype.onBeforeRendering.apply(this,arguments);this.synchronizeSelection();this._clearList();this._fillList(this.getItems())};b.prototype.oninput=function(e){C.prototype.oninput.apply(this,arguments);var c=sap.m.ComboBoxBaseRenderer.CSS_CLASS,s=this.getSelectedItem(),I=this.getItems(),o=e.target,v=o.value,f=true,V=false,d,m,L,i=0;if(v===""){this.setSelection(null,{suppressInvalidate:true});if(s!==this.getSelectedItem()){this.fireSelectionChange({selectedItem:this.getSelectedItem()})}}for(;i<I.length;i++){d=I[i];m=q.sap.startsWithIgnoreCase(d.getText(),v);L=d.data(c+"ListItem");if(v===""){m=true}L.setVisible(m);if(m&&!V){V=true}if(f&&m&&v!==""){f=false;if(this._bDoTypeAhead){this.updateDomValue(d.getText())}this.setSelection(d,{suppressInvalidate:true});if(s!==this.getSelectedItem()){this.fireSelectionChange({selectedItem:this.getSelectedItem()})}if(this._bDoTypeAhead){this.selectText(v.length,9999999)}this.scrollToItem(this.getList().getSelectedItem())}}if(V){this.open()}else{this.close()}};b.prototype.onSelectionChange=function(c){var L=c.getParameter("listItem"),n=this._findMappedItem(L),v;if((L.getType()==="Inactive")||!this.getEnabled()||!this.getEditable()){return}if(n){this.updateDomValue(n.getText());this.setSelection(n,{suppressInvalidate:true,listItemUpdated:true});this.fireSelectionChange({selectedItem:this.getSelectedItem()});v=this.getValue();if(sap.ui.Device.system.desktop){q.sap.delayedCall(0,this,"selectText",[v.length,v.length])}}};b.prototype.onItemPress=function(){this.close()};b.prototype.onkeydown=function(e){C.prototype.onkeydown.apply(this,arguments);if(!this.getEnabled()||!this.getEditable()){return}e.setMarked();var k=q.sap.KeyCodes;this._bDoTypeAhead=(e.which!==k.BACKSPACE)&&(e.which!==k.DELETE)};b.prototype.oncut=function(e){C.prototype.oncut.apply(this,arguments);this._bDoTypeAhead=false};b.prototype.onsapenter=function(e){C.prototype.onsapenter.apply(this,arguments);e.setMarked();if(!this.getEnabled()||!this.getEditable()){return}var v=this.getValue();this.setValue(v);this.selectText(v.length,v.length);if(this.isOpen()){this.close();this.clearFilter()}};b.prototype.onsapdown=function(e){if(!this.getEnabled()||!this.getEditable()){return}e.setMarked();e.preventDefault();var n,s=this.getSelectableItems(),d=this.getFocusDomRef(),S=d.selectionStart,i=d.selectionEnd,I=S!==i,t=d.value.substring(0,d.selectionStart);n=s[s.indexOf(this.getSelectedItem())+1];if(n){this.updateDomValue(n.getText());this.setSelection(n,{suppressInvalidate:true});this.fireSelectionChange({selectedItem:n});if(!q.sap.startsWithIgnoreCase(n.getText(),t)||!I){S=0}this.selectText(S,d.value.length)}this.scrollToItem(this.getList().getSelectedItem())};b.prototype.onsapup=function(e){if(!this.getEnabled()||!this.getEditable()){return}e.setMarked();e.preventDefault();var p,s=this.getSelectableItems(),d=this.getFocusDomRef(),S=d.selectionStart,i=d.selectionEnd,I=S!==i,t=d.value.substring(0,d.selectionStart);p=s[s.indexOf(this.getSelectedItem())-1];if(p){this.updateDomValue(p.getText());this.setSelection(p,{suppressInvalidate:true});this.fireSelectionChange({selectedItem:p});if(!q.sap.startsWithIgnoreCase(p.getText(),t)||!I){S=0}this.selectText(S,d.value.length)}this.scrollToItem(this.getList().getSelectedItem())};b.prototype.onsaphome=function(e){if(!this.getEnabled()||!this.getEditable()){return}e.setMarked();e.preventDefault();var f=this.getSelectableItems()[0];if(f&&(f!==this.getSelectedItem())){this.updateDomValue(f.getText());this.setSelection(f,{suppressInvalidate:true});this.fireSelectionChange({selectedItem:f});this.selectText(0,this.getFocusDomRef().value.length)}this.scrollToItem(this.getList().getSelectedItem())};b.prototype.onsapend=function(e){if(!this.getEnabled()||!this.getEditable()){return}e.setMarked();e.preventDefault();var L=this.findLastEnabledItem(this.getSelectableItems());if(L&&(L!==this.getSelectedItem())){this.updateDomValue(L.getText());this.setSelection(L,{suppressInvalidate:true});this.fireSelectionChange({selectedItem:L});this.selectText(0,this.getFocusDomRef().value.length)}this.scrollToItem(this.getList().getSelectedItem())};b.prototype.onsappagedown=function(e){if(!this.getEnabled()||!this.getEditable()){return}e.setMarked();e.preventDefault();var s=this.getSelectableItems(),i=s.indexOf(this.getSelectedItem())+10,I;i=(i>s.length-1)?s.length-1:Math.max(0,i);I=s[i];if(I&&(I!==this.getSelectedItem())){this.updateDomValue(I.getText());this.setSelection(I,{suppressInvalidate:true});this.fireSelectionChange({selectedItem:I});this.selectText(0,this.getFocusDomRef().value.length)}this.scrollToItem(this.getList().getSelectedItem())};b.prototype.onsappageup=function(e){if(!this.getEnabled()||!this.getEditable()){return}e.setMarked();e.preventDefault();var s=this.getSelectableItems(),i=s.indexOf(this.getSelectedItem())-10,I;i=(i>s.length-1)?s.length-1:Math.max(0,i);I=s[i];if(I&&(I!==this.getSelectedItem())){this.updateDomValue(I.getText());this.setSelection(I,{suppressInvalidate:true});this.fireSelectionChange({selectedItem:I});this.selectText(0,this.getFocusDomRef().value.length)}this.scrollToItem(this.getList().getSelectedItem())};b.prototype.onfocusin=function(e){this.$().addClass("sapMComboBoxFocused");if(e.target===this.getOpenArea()){this.bCanNotOpenMessage=true;if(sap.ui.Device.system.desktop){this.focus()}}else{if(sap.ui.Device.system.desktop){q.sap.delayedCall(0,this,function(){if(document.activeElement===this.getFocusDomRef()){this.selectText(0,this.getValue().length)}})}if(!this.isOpen()&&!this.bCanNotOpenMessage){this.openValueStateMessage()}this.bCanNotOpenMessage=false}};b.prototype.onsapfocusleave=function(e){var p=this.getAggregation("picker");this.$().removeClass("sapMComboBoxFocused");if(!e.relatedControlId||!p){return}var c=sap.ui.getCore().byId(e.relatedControlId),f=c&&c.getFocusDomRef();if(q.sap.containsOrEquals(p.getFocusDomRef(),f)){if(sap.ui.Device.system.desktop){this.focus()}}};b.prototype.setSelection=function(i,o){var L;o=o||{};this.setAssociation("selectedItem",i||null,o.suppressInvalidate);this.setProperty("selectedItemId",i?i.getId():"",o.suppressInvalidate);this.setProperty("selectedKey",i?i.getKey():"",o.suppressInvalidate);if(!o.listItemUpdated){L=this._getSelectedListItem();if(L){this.getList().setSelectedItem(L,true)}else if(this.getList()){if(this.getDefaultSelectedItem()){this.getList().setSelectedItem(this.getDefaultSelectedItem().data(sap.m.ComboBoxBaseRenderer.CSS_CLASS+"ListItem"),true)}else if(this.getList().getSelectedItem()){this.getList().setSelectedItem(this.getList().getSelectedItem(),false)}}}};b.prototype.isSelectionSynchronized=function(){var i=this.getSelectedItem();return this.getSelectedKey()===(i&&i.getKey())};b.prototype.synchronizeSelection=function(){if(this.isSelectionSynchronized()){return}var k=this.getSelectedKey(),i=this.getItemByKey(""+k);if(i&&(k!=="")){this.setAssociation("selectedItem",i,true);this.setProperty("selectedItemId",i.getId(),true);if(this._sValue===this.getValue()){this.setValue(i.getText())}}};b.prototype.isFiltered=function(){return this.getVisibleItems().length!==this.getItems().length};b.prototype.createPicker=function(p){var P=this.getAggregation("picker");if(P){return P}P=this["_create"+p]();this.setAggregation("picker",P,true);P.setHorizontalScrolling(false).addStyleClass(sap.m.ComboBoxBaseRenderer.CSS_CLASS+"Picker").attachBeforeOpen(this.onBeforeOpen,this).attachAfterOpen(this.onAfterOpen,this).attachBeforeClose(this.onBeforeClose,this).attachAfterClose(this.onAfterClose,this).addEventDelegate({onBeforeRendering:this.onBeforeRenderingPicker,onAfterRendering:this.onAfterRenderingPicker},this).addContent(this.getList());return P};b.prototype.createList=function(){this._oList=new sap.m.List({width:"100%",mode:sap.m.ListMode.SingleSelectMaster,rememberSelections:false}).addStyleClass(sap.m.ComboBoxBaseRenderer.CSS_CLASS+"List").attachSelectionChange(this.onSelectionChange,this).attachItemPress(this.onItemPress,this)};b.prototype.onBeforeRenderingPicker=function(){var o=this["onBeforeRendering"+this.getPickerType()];o&&o.call(this)};b.prototype.onAfterRenderingPicker=function(){var o=this["onAfterRendering"+this.getPickerType()];o&&o.call(this)};b.prototype.onBeforeOpen=function(){var p=this["onBeforeOpen"+this.getPickerType()];this.addStyleClass(sap.m.ComboBoxBaseRenderer.CSS_CLASS+"Pressed");this.addContent();p&&p.call(this)};b.prototype.onBeforeOpenPopover=function(){var d=this.getDomRef(),c=window.getComputedStyle(d);if(c){this.getPicker().setContentWidth((parseFloat(c.width)/parseFloat(sap.m.BaseFontSize))+"rem")}};b.prototype.onAfterOpen=function(){};b.prototype.onBeforeClose=function(){this.removeStyleClass(sap.m.ComboBoxBaseRenderer.CSS_CLASS+"Pressed")};b.prototype.onAfterClose=function(){if(document.activeElement===this.getFocusDomRef()){this.openValueStateMessage()}};b.prototype.isItemSelected=function(i){return i&&(i.getId()===this.getAssociation("selectedItem"))};b.prototype.getDefaultSelectedItem=function(){return this.getForceSelection()?this.findFirstEnabledItem():null};b.prototype.clearSelection=function(){this.setSelection(null)};b.prototype.selectText=function(s,S){C.prototype.selectText.apply(this,arguments);this.textSelectionStart=s;this.textSelectionEnd=S;return this};b.prototype.setValue=function(v,s){if(!s&&this.getForceSelection()&&!this.getItemByText(v)){return this}C.prototype.setValue.call(this,v);return this};b.prototype.setSelectedItem=function(i){if(typeof i==="string"){i=sap.ui.getCore().byId(i)}if(!(i instanceof sap.ui.core.Item)&&i!==null){q.sap.log.warning('Warning: setSelectedItem() "vItem" has to be an instance of sap.ui.core.Item, a valid sap.ui.core.Item id, or null on',this);return this}if(!i){i=this.getDefaultSelectedItem()}this.setSelection(i,{suppressInvalidate:true});if(i){this.setValue(i.getText(),true)}else if(i=this.getDefaultSelectedItem()){this.setValue(i.getText(),true)}else{this.setValue("",true)}return this};b.prototype.setSelectedItemId=function(i){i=this.validateProperty("selectedItemId",i);var I=sap.ui.getCore().byId(i);if(!(I instanceof sap.ui.core.Item)&&i!==""){q.sap.log.warning('Warning: setSelectedItemId() "sItem" has to be a string id of an sap.ui.core.Item instance, an empty string or undefined on',this);return this}if(!I){I=this.getDefaultSelectedItem()}this.setSelection(I,{suppressInvalidate:true});if(I){this.setValue(I.getText(),true)}else if(I=this.getDefaultSelectedItem()){this.setValue(I.getText(),true)}else{this.setValue("",true)}return this};b.prototype.setSelectedKey=function(k){k=this.validateProperty("selectedKey",k);var i=this.getItemByKey(k);if(i||(k==="")){if(!i&&k===""){i=this.getDefaultSelectedItem()}this.setSelection(i,{suppressInvalidate:true});if(i){this.setValue(i.getText(),true)}else if(i=this.getDefaultSelectedItem()){this.setValue(i.getText(),true)}else{this.setValue("",true)}return this}this._sValue=this.getValue();return this.setProperty("selectedKey",k)};b.prototype.getSelectedItem=function(){var s=this.getAssociation("selectedItem");return(s===null)?null:sap.ui.getCore().byId(s)||null};b.prototype.removeItem=function(i){i=C.prototype.removeItem.call(this,i);var v=this.getValue(),I;if(this.getItems().length===0){this.clearSelection()}else if(this.isItemSelected(i)){I=this.getDefaultSelectedItem();this.setSelection(I);this.setValue(v)}return i};b.prototype.removeAllItems=function(){var i=C.prototype.removeAllItems.call(this);if(this.getForceSelection()){this.setValue("",true)}return i};b.prototype.getForceSelection=function(){return false};b.prototype.setForceSelection=function(){};return b},true);
