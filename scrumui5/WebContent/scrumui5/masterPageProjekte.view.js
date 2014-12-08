sap.ui.jsview("scrumui5.masterPageProjekte", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf scrumui5.masterPageProjekte
	*/ 
	getControllerName : function() {
		return "scrumui5.masterPageProjekte";
	},
	
	onBeforeShow: function(event){
		this.getController().onBeforeRendering(event);
		},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf scrumui5.masterPageProjekte
	*/ 
	createContent : function(oController) {
		
		projektModel = new sap.ui.model.xml.XMLModel();
		
		var projektTemplate = new sap.m.StandardListItem({
			title : "{Bezei}",
			type : "Navigation",
			press : function() {
				var bindingContext = this.getBindingContext();
				var path = bindingContext.getPath()+'/Kunde';
				var kundenId = bindingContext.getProperty(path);
				var path = bindingContext.getPath()+'/Projekt';
				var projektId = bindingContext.getProperty(path);
				oSplitApp.to("masterPageSprints", {kunde : kundenId, projekt : projektId}, false);
			}
		});
		
 		return new sap.m.Page({
			title: "Projekte",
			showNavButton: true,
			navButtonText: "Kunden",
			navButtonTap: function() {
				oSplitApp.backMaster();
			},
			content: [new sap.m.List(
					{
						items : {
							path : "/soap-env:Body/n0:ZMguReadProjekteResponse/Projekte/item/",
							template : projektTemplate
						}
					}).setModel(projektModel)
			
			]
		});
	}

});