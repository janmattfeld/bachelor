sap.ui.jsview("scrumui5.masterPageKunden", {

	/**
	 * Specifies the Controller belonging to this View. In the case that it is
	 * not implemented, or that "null" is returned, this View does not have a
	 * Controller.
	 * 
	 * @memberOf scrumui5.masterPageKunden
	 */
	getControllerName : function() {
		return "scrumui5.masterPageKunden";
	},

	/**
	 * Is initially called once after the Controller has been instantiated. It
	 * is the place where the UI is constructed. Since the Controller is given
	 * to this method, its event handlers can be attached right away.
	 * 
	 * @memberOf scrumui5.masterPageKunden
	 */
	createContent : function(oController) {		

		var kundenTemplate = new sap.m.StandardListItem({
			title : "{Kunde}",
			type : "Navigation",
			press : oController.onPress
		});

		return new sap.m.Page({
			title : "Kunden",
			content : [ new sap.m.List({
				items : {
					path : "/Kunden/",
					template : kundenTemplate
				}
			})]
		});
	}

});