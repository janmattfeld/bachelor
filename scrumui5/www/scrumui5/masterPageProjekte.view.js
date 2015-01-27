sap.ui.jsview("scrumui5.masterPageProjekte", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf scrumui5.masterPageProjekte
	*/ 
	getControllerName : function() {
		return "scrumui5.masterPageProjekte";
	},
	
	onBeforeShow: function(oEvent){
		this.getController().onBeforeRendering(oEvent);
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf scrumui5.masterPageProjekte
	*/ 
	createContent : function(oController) {
		
		var oProjectTemplate = new sap.m.StandardListItem({
			title : "{Bezei}",
			type : "Navigation",
			press : oController.onPress
		});
		
		var oProjectList = new sap.m.List(this.createId("projectList"), {
			items : {
				path : "/Projekte",
				template : oProjectTemplate
			}
		});

		 return new sap.m.Page({
			title : "Projekte",
			showNavButton : true,
			navButtonText : "Kunden",
			navButtonTap : function() {
				oSplitApp.backMaster();
			},
			content : [ oProjectList ]
		});
	}

});