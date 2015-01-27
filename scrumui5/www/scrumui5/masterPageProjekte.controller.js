sap.ui.controller("scrumui5.masterPageProjekte", {
	
/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf scrumui5.masterPageProjekte
*/
//	onInit: function() {
//		// TODO deferrer
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf scrumui5.masterPageProjekte
*/
	onBeforeRendering : function(oEvent) {
		// TODO use router with getParameters()
		if (oEvent.data && oEvent.data.customerName) {
			
			var sCustomerName = oEvent.data.customerName;
			jQuery.sap.log.info("Selected Customer: " + sCustomerName);	
			
			var oProjectList = this.getView().byId("projectList");
			var oBinding = oProjectList.getBinding("items");
			
			if (oBinding !== undefined) {				
				var oFilter1 = new sap.ui.model.Filter("Kunde",
						sap.ui.model.FilterOperator.EQ, sCustomerName);
//				this.getView().setTitle(sCustomerName);
				oBinding.filter([ oFilter1 ]);				
			}
		}
	},

/**
 * Called when the View has been rendered (so its HTML is part of the document).
 * Post-rendering manipulations of the HTML could be done here. This hook is the
 * same one that SAPUI5 controls get after being rendered.
 * 
 * @memberOf scrumui5.masterPageProjekte
 */
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf scrumui5.masterPageProjekte
*/
//	onExit: function() {
//
//	},
		
	/**
	 * Called when the ListItem is pressed.
	 * 
	 * @memberOf scrumui5.masterPageProjekte
	 */
	onPress: function() {
		var oBindingContext = this.getBindingContext();
		var sPath = oBindingContext.getPath()+'/Kunde';
		var sCustomerName = oBindingContext.getProperty(sPath);
		var sPath = oBindingContext.getPath()+'/Projekt';
		var sProjectName = oBindingContext.getProperty(sPath);
		oSplitApp.to("masterPageSprints", {customerName : sCustomerName, projectName : sProjectName}, false);
	}
});