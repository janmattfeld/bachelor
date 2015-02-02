// A module declaration, ensures that de.abat.scrumui5 exists
jQuery.sap.declare("de.abat.scrumui5.Component");

// Load custom router for page navigation
// TODO include in Component?
jQuery.sap.require("de.abat.scrumui5.MyRouter");

/**
 * @class Defines a root UI component that exposes the main view
 * 
 * When apps are started by the Fiori Launchpad (FLP) they are loaded as child
 * objects into the FLP’s context. The FLP acts as a shell and with the
 * exception of Web pages (.html launches) all the apps it launches run in the
 * same window or tab in the browser. Therefore, all the apps share the same
 * JavaScript window object.This is the object used by JavaScript to hold global
 * variables; therefore, the possibility of your data becoming corrupted by some
 * other app is increased.
 * 
 * The same goes for the Global Event Bus: use a Router instead. If you raise an
 * event on the Global Event Bus, you cannot guarantee that the event name is
 * not shared by some other app active within the FLP.
 * 
 * Finally, do not define a model belonging to sap.ui.core: In order to ensure
 * separation of concerns, all models should be defnied as belonging to the UI
 * Component instead.
 * 
 * The first view referenced the UI Component must be an XML view. Irrespective
 * of whether it is an App View or a SplitApp view, it needs to be defined using
 * XML. The use of XML views is being adopted by SAP since this is a necessary
 * prerequisite for the upcoming WYSYWIG view editor in the SAP River Rapid
 * Development Environment (SAP River RDE) tool.
 * 
 * @see https://sapui5.hana.ondemand.com/sdk/#docs/guide/170638b7a2b4424e8580fb473af6a3cd.html
 * @author jam@abat.de
 * @extends sap.ui.core.UIComponent
 * @name de.abat.scrumui5.Component
 */
sap.ui.core.UIComponent.extend("de.abat.scrumui5.Component", {
	metadata : {
		name : "abat ScrumUI5",
		version : "0.0.1",
		includes : [],
		dependencies : {
			libs : [ "sap.m" ],
			components : []
		},

		rootView : "de.abat.scrumui5.view.App",

		// TODO: Use config file of shopping cart demo app
		config : {
			resourceBundle : "i18n/messageBundle.properties",
			serviceConfig : {
				name : "Z_ZAV_KUNDE_SAPUI5",
				serviceUrl : "http://services.odata.org/V2/OData/OData.svc/"
			}
		},

		// Access views and entities via URL, example: /customer/abat etc.
		routing : {
			config : {
				routerClass : de.abat.scrumui5.MyRouter,
				viewType : "XML",
				viewPath : "de.abat.scrumui5.view",
				clearTarget : false,
				transition : "slide"
			},
			routes : [ {
				pattern : "",
				name : "main",
				view : "Master",
				viewLevel : 1,
				targetAggregation : "masterPages",
				targetControl : "idAppControl",
				subroutes : [ {
					pattern : "{entity}/toProjekte",
					name : "master2",
					view : "Master2",
					viewLevel : 2,
					targetAggregation : "masterPages"
				} ]
			}, {
				pattern : "Kunden/{Kunde}/Projekte/{Projekt}",
				name : "master3",
				view : "Master3",
				viewLevel : 3,
				targetAggregation : "masterPages"
			} ]
		}
	},

	init : function() {

		sap.ui.core.UIComponent.prototype.init.apply(this, arguments);

		var mConfig = this.getMetadata().getConfig();

		// Always use absolute paths relative to our own component
		// (relative paths will fail if running in the Fiori Launchpad)
		var rootPath = jQuery.sap.getModulePath("de.abat.scrumui5");

		// Set i18n (internationalization) model
		var i18nModel = new sap.ui.model.resource.ResourceModel({
			bundleUrl : [ rootPath, mConfig.resourceBundle ].join("/")
		});
		this.setModel(i18nModel, "i18n");

		// Create and set domain model to the component
		var sServiceUrl = mConfig.serviceConfig.serviceUrl;
		var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl, true);
		this.setModel(oModel);

		// Set device model
		var deviceModel = new sap.ui.model.json.JSONModel({
			isTouch : sap.ui.Device.support.touch,
			isNoTouch : !sap.ui.Device.support.touch,
			isPhone : sap.ui.Device.system.phone,
			isNoPhone : !sap.ui.Device.system.phone,
			listMode : sap.ui.Device.system.phone ? "None" : "SingleSelectMaster",
			listItemType : sap.ui.Device.system.phone ? "Active" : "Inactive"
		});
		deviceModel.setDefaultBindingMode("OneWay");
		this.setModel(deviceModel, "device");

		this.getRouter().initialize();
	}
});
