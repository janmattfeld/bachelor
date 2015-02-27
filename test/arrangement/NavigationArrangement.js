sap.ui.define("de.abat.scrumui5.test.arrangement.NavigationArrangement", [
	"jquery.sap.global",
	"sap/ui/test/Opa5",
	"sap/ui/core/ComponentContainer"
], function (jQuery, Opa5, ComponentContainer) {

	'use strict';

	var oContainer = null;
	var oComponent = null;

	return Opa5.extend("de.abat.scrumui5.test.arrangement.NavigationArrangement", {
		iStartMyApp: function (sHash) {
			sHash = sHash || "";
			return this.iStartMyAppInAFrame("../index.html?responderOn=true" + sHash);
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
