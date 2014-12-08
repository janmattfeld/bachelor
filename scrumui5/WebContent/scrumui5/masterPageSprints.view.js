sap.ui.jsview("scrumui5.masterPageSprints", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf scrumui5.masterPageSprints
	*/ 
	getControllerName : function() {
		return "scrumui5.masterPageSprints";
	},
	
	onBeforeShow: function(event){
		this.getController().onBeforeRendering(event);
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf scrumui5.masterPageSprints
	*/ 
	createContent : function(oController) {
		
		sprintModel = new sap.ui.model.xml.XMLModel();
		
		var sprintTemplate = new sap.m.StandardListItem({
			title : "{Sprint}",
			type : "Navigation",
			press : function() {
				var bindingContext = this.getBindingContext();
				var path = bindingContext.getPath()+'/Kunde';
				var kundenId = bindingContext.getProperty(path);
				var path = bindingContext.getPath()+'/Projekt';
				var projektId = bindingContext.getProperty(path);
				var path = bindingContext.getPath()+'/Sprint';
				var sprintId = bindingContext.getProperty(path);
				getAufgaben(kundenId, projektId, sprintId);
//				oSplitApp.to("masterPageSprints", {kunde : kundenId, projekt : projektId}, false);				
//				oSplitApp.toDetail("idscrumBoard1");
			}
		});
		
 		return new sap.m.Page({
			title: "Sprints",
			showNavButton: true,
			navButtonText: "Projekte",
			navButtonTap: function() {
				oSplitApp.backMaster();
			},
			content: [new sap.m.List(
					{
						items : {
							path : "/soap-env:Body/n0:ZMguReadSprintResponse/TabSprint/item/",
							template : sprintTemplate
						}
					}).setModel(sprintModel)
			
			]
		});
	}

});