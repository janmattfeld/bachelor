/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2014 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.ui.unified.ShellRenderer");sap.ui.unified.ShellRenderer={};
sap.ui.unified.ShellRenderer.render=function(r,s){var i=s.getId();r.write("<div");r.writeControlData(s);r.addClass("sapUiUfdShell");if(s._animation){r.addClass("sapUiUfdShellAnim")}if(s.getSearch()){r.addClass("sapUiUfdShellWithSearch")}r.addClass("sapUiUfdShellHead"+(s._showHeader?"Visible":"Hidden"));if(s.getShowCurtain()){r.addClass("sapUiUfdShellCurtainVisible")}else{r.addClass("sapUiUfdShellCurtainHidden");r.addClass("sapUiUfdShellCurtainClosed")}r.writeClasses();r.write(">");r.write("<hr id='",i,"-brand' class='sapUiUfdShellBrand'/>");r.write("<header id='",i,"-hdr'  class='sapUiUfdShellHead'><div>");r.write("<div id='",i,"-hdrcntnt' class='sapUiUfdShellCntnt'>");sap.ui.unified.ShellRenderer._renderHeaderContent(r,s);r.write("</div>","</div>","</header>");r.write("<section id='",i,"-curt' class='sapUiUfdShellCntnt sapUiUfdShellCurtain'>");r.write("<div id='",i,"-curtcntnt' class='sapUiUfdShellCntnt'>");r.renderControl(s._curtCont);r.write("</div>");r.write("<span id='",i,"-curt-focusDummyOut' tabindex='0'></span>");r.write("</section>");r.write("<div id='",i,"-cntnt' class='sapUiUfdShellCntnt sapUiUfdShellCanvas sapUiUfdShellBackground'>");r.write("<div id='",i,"-strgbg' class='sapUiUfdShellBG"+(s._useStrongBG?" sapMGlobalBackgroundColorStrong":"")+"'></div>");r.write("<div class='sapMGlobalBackgroundImage sapUiUfdShellBG'></div>");r.renderControl(s._cont);r.write("</div>");r.write("<span id='",i,"-main-focusDummyOut' tabindex='"+(s.getShowCurtain()?0:-1)+"'></span>");r.write("</div>")};
sap.ui.unified.ShellRenderer._renderHeaderContent=function(r,s){var i=s.getId();r.write("<div id='",i,"-hdr-begin' class='sapUiUfdShellHeadBegin'>");sap.ui.unified.ShellRenderer.renderHeaderItems(r,s,true);r.write("</div>");r.write("<div id='",i,"-hdr-center' class='sapUiUfdShellHeadCenter'>");sap.ui.unified.ShellRenderer.renderSearch(r,s);r.write("</div>");r.write("<div id='",i,"-hdr-end' class='sapUiUfdShellHeadEnd'>");sap.ui.unified.ShellRenderer.renderHeaderItems(r,s,false);r.write("</div>")};
sap.ui.unified.ShellRenderer.renderSearch=function(r,s){var S=s.getSearch();r.write("<div id='",s.getId(),"-hdr-search'");r.writeAttribute("class","sapUiUfdShellSearch"+(s.getSearchVisible()?"":" sapUiUfdShellHidden"));r.write("><div>");if(S){r.renderControl(S)}r.write("</div></div>")};
sap.ui.unified.ShellRenderer.renderHeaderItems=function(r,s,b){r.write("<div class='sapUiUfdShellHeadContainer'>");var I=b?s.getHeadItems():s.getHeadEndItems();for(var i=0;i<I.length;i++){r.write("<a tabindex='0' href='javascript:void(0);'");r.writeElementData(I[i]);r.addClass("sapUiUfdShellHeadItm");if(I[i].getStartsSection()){r.addClass("sapUiUfdShellHeadItmDelim")}if(!I[i].getVisible()){r.addClass("sapUiUfdShellHidden")}if(I[i].getSelected()){r.addClass("sapUiUfdShellHeadItmSel")}if(I[i].getShowMarker()){r.addClass("sapUiUfdShellHeadItmMark")}r.writeClasses();var t=I[i].getTooltip_AsString();if(t){r.writeAttributeEscaped("title",t)}r.write("><span></span><div class='sapUiUfdShellHeadItmMarker'><div></div></div></a>")}var u=s.getUser();if(!b&&u){r.write("<a tabindex='0' href='javascript:void(0);'");r.writeElementData(u);r.addClass("sapUiUfdShellHeadUsrItm");r.writeClasses();var t=u.getTooltip_AsString();if(t){r.writeAttributeEscaped("title",t)}r.write("><span id='",u.getId(),"-img' class='sapUiUfdShellHeadUsrItmImg'></span>");r.write("<span id='"+u.getId()+"-name' class='sapUiUfdShellHeadUsrItmName'");var U=u.getUsername()||"";r.writeAttributeEscaped("title",U);r.write(">");r.writeEscaped(U);r.write("</span><span class='sapUiUfdShellHeadUsrItmExp'></span></a>")}r.write("</div>");if(b){sap.ui.unified.ShellRenderer._renderIcon(r,s)}};
sap.ui.unified.ShellRenderer._renderIcon=function(r,s){var a=sap.ui.getCore().getLibraryResourceBundle("sap.ui.unified"),l=a.getText("SHELL_LOGO_TOOLTIP"),i=s._getIcon();r.write("<div class='sapUiUfdShellIco'>");r.write("<img id='",s.getId(),"-icon'");r.writeAttributeEscaped("title",l);r.writeAttributeEscaped("alt",l);r.write("src='");r.writeEscaped(i);r.write("' style='",i?"":"display:none;","'></img>");r.write("</div>")};
