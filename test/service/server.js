sap.ui.define([ "sap/ui/core/util/MockServer" ], function(MockServer) {

	"use strict";

	return {

		_sServiceUrl : "http://user:pass@uri:8000/sap/opu/odata/sap/Z_ZAV_SCRUM_SRV/",
		_sModulePath : "de.abat.scrumui5.service",

		/**
		 * Initializes the mock server (typically when the app is called with
		 * the URL parameter "responderOn=true"). The local mock data in this
		 * folder is returned instead of the real data for testing.
		 *
		 * @public
		 */

		init : function(s) {
			// create server
			var oMockServer = new MockServer({
				rootUri : this._sServiceUrl
			}), sPath = jQuery.sap.getModulePath(this._sModulePath);

			// config mock server with a delay of 1s
			MockServer.config({
				autoRespond : true,
				autoRespondAfter : 500
			});

			// load local mock data
			oMockServer.simulate(sPath + "/metadata.xml", sPath);
			oMockServer.start();

			jQuery.sap.log.info("Running the app with mock data");
		}
	};

}, /* bExport= */true);
