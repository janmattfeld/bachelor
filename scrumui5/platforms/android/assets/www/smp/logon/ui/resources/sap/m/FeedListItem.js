/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2014 SAP SE. All rights reserved
 */
jQuery.sap.declare("sap.m.FeedListItem");jQuery.sap.require("sap.m.library");jQuery.sap.require("sap.m.ListItemBase");sap.m.ListItemBase.extend("sap.m.FeedListItem",{metadata:{library:"sap.m",properties:{"icon":{type:"sap.ui.core.URI",group:"Data",defaultValue:null},"activeIcon":{type:"sap.ui.core.URI",group:"Data",defaultValue:null},"sender":{type:"string",group:"Data",defaultValue:null},"text":{type:"string",group:"Data",defaultValue:null},"info":{type:"string",group:"Data",defaultValue:null},"timestamp":{type:"string",group:"Data",defaultValue:null},"senderActive":{type:"boolean",group:"Behavior",defaultValue:true},"iconActive":{type:"boolean",group:"Behavior",defaultValue:true},"iconDensityAware":{type:"boolean",group:"",defaultValue:true},"showIcon":{type:"boolean",group:"Behavior",defaultValue:true},"maxCharacters":{type:"int",group:"Behavior",defaultValue:null}},events:{"senderPress":{},"iconPress":{}}}});sap.m.FeedListItem.M_EVENTS={'senderPress':'senderPress','iconPress':'iconPress'};sap.m.FeedListItem._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.m");sap.m.FeedListItem._nMaxCharactersMobile=300;sap.m.FeedListItem._nMaxCharactersDesktop=500;sap.m.FeedListItem._sTextShowMore=sap.m.FeedListItem._oRb.getText("TEXT_SHOW_MORE");sap.m.FeedListItem._sTextShowLess=sap.m.FeedListItem._oRb.getText("TEXT_SHOW_LESS");
sap.m.FeedListItem.prototype.exit=function(e){if(this._oLinkControl){this._oLinkControl.destroy()}if(this._oImageControl){this._oImageControl.destroy()}if(this._oLinkExpandCollapse){this._oLinkExpandCollapse.destroy()}sap.m.ListItemBase.prototype.exit.apply(this)};
sap.m.FeedListItem.prototype.ontap=function(e){if(e.srcControl.getId()===this.getId()+"-icon"&&this.getIconActive()){var f=this.getDomRef("figure");this.fireIconPress({domRef:f})}else if(!this._oLinkControl||!this.getSenderActive()||e.srcControl.getId()!==this._oLinkControl.getId()){sap.m.ListItemBase.prototype.ontap.apply(this,[e])}};
sap.m.FeedListItem.prototype._getImageControl=function(){var i=this.getIcon()?this.getIcon():sap.ui.core.IconPool.getIconURI("person-placeholder"),I=this.getId()+'-icon',p={src:i,alt:this.getSender(),densityAware:this.getIconDensityAware()},c=['sapMFeedListItemImage'];this._oImageControl=sap.m.ImageHelper.getImageControl(I,this._oImageControl,this,p,c);return this._oImageControl};
sap.m.FeedListItem.prototype._getLinkControl=function(){if(!this._oLinkControl){jQuery.sap.require("sap.m.Link");var t=this;this._oLinkControl=new sap.m.Link({press:function(){var s=this.getDomRef();t.fireSenderPress({domRef:s})}});this._oLinkControl.setParent(this,null,true)}this._oLinkControl.setProperty("text",this.getSender(),true);this._oLinkControl.setProperty("enabled",this.getSenderActive(),true);return this._oLinkControl};
sap.m.FeedListItem.prototype._activeHandlingInheritor=function(){var a=this.getActiveIcon();if(!!this._oImageControl&&!!a){this._oImageControl.setSrc(a)}};
sap.m.FeedListItem.prototype._inactiveHandlingInheritor=function(){var s=this.getIcon();if(!!this._oImageControl){this._oImageControl.setSrc(s)}};
sap.m.FeedListItem.prototype._getCollapsedText=function(){var s=this._sFullText.substring(0,this._nMaxCollapsedLength);var n=s.lastIndexOf(" ");if(n>0){this._sShortText=s.substr(0,n)}return this._sShortText};
sap.m.FeedListItem.prototype._toggleTextExpanded=function(){var $=jQuery.sap.byId(this.getId()+"-realtext");var a=jQuery.sap.byId(this.getId()+"-threeDots");if(this._bTextExpanded){$.text(this._sShortText);a.text(" ... ");this._oLinkExpandCollapse.setText(sap.m.FeedListItem._sTextShowMore);this._bTextExpanded=false}else{$.text(this._sFullText);a.text("  ");this._oLinkExpandCollapse.setText(sap.m.FeedListItem._sTextShowLess);this._bTextExpanded=true}};
sap.m.FeedListItem.prototype._getLinkExpandCollapse=function(){if(!this._oLinkExpandCollapse){jQuery.sap.require("sap.m.Link");this._oLinkExpandCollapse=new sap.m.Link({text:sap.m.FeedListItem._sTextShowMore,press:jQuery.proxy(function(){this._toggleTextExpanded()},this)});this._bTextExpanded=false;this._oLinkExpandCollapse.setParent(this,null,true)}return this._oLinkExpandCollapse};
sap.m.FeedListItem.prototype._checkTextIsExpandable=function(){this._nMaxCollapsedLength=this.getMaxCharacters();if(this._nMaxCollapsedLength===0){if(sap.ui.Device.system.phone){this._nMaxCollapsedLength=sap.m.FeedListItem._nMaxCharactersMobile}else{this._nMaxCollapsedLength=sap.m.FeedListItem._nMaxCharactersDesktop}}this._sFullText=this.getText();var t=false;if(this._sFullText.length>this._nMaxCollapsedLength){t=true}return t};
