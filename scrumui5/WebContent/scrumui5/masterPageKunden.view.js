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
	createContent : function(controller) {		

		// TODO register models in index/app controller
		kundenModel = new sap.ui.model.xml.XMLModel();

		var kundenTemplate = new sap.m.StandardListItem({
			title : "{Kunde}",
			type : "Navigation",
			press : function() {
				var bindingContext = this.getBindingContext();
				var path = bindingContext.getPath()+'/Kunde';
				var kundenId = bindingContext.getProperty(path);
				oSplitApp.to("masterPageProjekte", {kunde : kundenId}, false);
			}
		});

		return new sap.m.Page({
			title : "Kunden",
			content : [ new sap.m.List({
				items : {
					path : "/soap-env:Body/n0:ZMguReadKundenResponse/Kunden/item/",
					template : kundenTemplate
				}
			}).setModel(kundenModel) ]
		});
	}

});