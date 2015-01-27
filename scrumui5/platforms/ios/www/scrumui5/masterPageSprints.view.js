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
		
		var sprintTemplate = new sap.m.StandardListItem({
			title : "{Sprint}",
			type : "Navigation",
			press : function() {
				var bindingContext = this.getBindingContext();
				var path = bindingContext.getPath()+'/Kunde';
				var kundenId = bindingContext.getProperty(path);
				var path = bindingContext.getPath()+'/Projekte';
				var projektId = bindingContext.getProperty(path);
				var path = bindingContext.getPath()+'/Sprint';
				var sprintId = bindingContext.getProperty(path);
				getAufgaben(kundenId, projektId, sprintId);
//				oSplitApp.to("masterPageSprints", {kunde : kundenId, projekt : projektId}, false);				
//				oSplitApp.toDetail("idscrumBoard1");
			}
		});
		
		var oSprintList = new sap.m.List(this.createId("sprintList"), {
			items : {
				path : "/Sprint",
				template : sprintTemplate
			}
		});
		
 		return new sap.m.Page({
			title: "Sprints",
			showNavButton: true,
			navButtonText: "Projekte",
			navButtonTap: function() {
				oSplitApp.backMaster();
			},
			content: [oSprintList]
		});
	}

});