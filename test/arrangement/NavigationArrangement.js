'use strict';

sap.ui.define("de.abat.scrumui5.test.arrangement.NavigationArrangement", [
	"jquery.sap.global",
	"sap/ui/test/Opa5",
	"sap/ui/core/ComponentContainer"
], function (jQuery, Opa5, ComponentContainer) {

	var oContainer = null;
	var oComponent = null;

	return Opa5.extend("de.abat.scrumui5.test.arrangement.NavigationArrangement", {

		_getFrameUrl: function (sHash, bAddPhone) {
			sHash = sHash || "";
			var sUrl = jQuery.sap.getResourcePath("root/index", ".html"), sUrlParameters = "?responderOn=true";
			if (bAddPhone) {
				sUrlParameters = sUrlParameters + "&sap-ui-xx-fakeOS=ios";
			}
			sUrl = sUrl + sUrlParameters + sHash;
			return sUrl;
		},

		GivenIStartTheAppOnADesktopDevice: function (sHash) {
			this.iStartMyAppInAFrame(this._getFrameUrl(sHash));
		},

		GivenIStartTheAppOnAPhone: function (sHash) {
			this.iStartMyAppInAFrame(this._getFrameUrl(sHash, true));
		},

		iStartAComponent: function (sName) {
			if (!oContainer) {
				var $body = jQuery("body");
				$body.addClass("sapUiBody").attr("role", "application");
				if ($body.find("#content").length === 0) {
					$body.append('<div id="content"></div>');
				}
				oContainer = new ComponentContainer();
				oContainer.placeAt("content");
			}
			if (oComponent) {
				oComponent.destroy();
				Opa5.getPlugin().mViews = {};
			}
			oComponent = sap.ui.getCore().createComponent({
				name: sName
			});
			oContainer.setComponent(oComponent);
			return this;
		}
	});
});
