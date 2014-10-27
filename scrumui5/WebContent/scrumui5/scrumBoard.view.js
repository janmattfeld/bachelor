sap.ui.jsview("scrumui5.scrumBoard", {

	/**
	 * Specifies the Controller belonging to this View. In the case that it is
	 * not implemented, or that "null" is returned, this View does not have a
	 * Controller.
	 * 
	 * @memberOf scrumui5.scrumBoard
	 */
	getControllerName : function() {
		return "scrumui5.scrumBoard";
	},

	/**
	 * Is initially called once after the Controller has been instantiated. It
	 * is the place where the UI is constructed. Since the Controller is given
	 * to this method, its event handlers can be attached right away.
	 * 
	 * @memberOf scrumui5.scrumBoard
	 */
	createContent : function(oController) {

		var matrixLayout = new sap.ui.commons.layout.MatrixLayout({});
		var toolBar1 = new sap.m.StandardTile({
			title : "TMC Bearbeitung Aufgabenteile",
			info : "Oliver Henning",
			number : 3602,
			id:"toolbar"
		});
//		
		// TODO Model, Datum, draggable
		matrixLayout.createRow(toolBar1, "Zweiter");

		return new sap.m.Page({
			title : "scrumUI5",
			content : matrixLayout
		});
	}

});