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

		//		var toolBar1 = new sap.m.StandardTile({
		//			title : "TMC Bearbeitung Aufgabenteile",
		//			info : "Oliver Henning",
		//			number : 3602,
		//			id:"toolbar1"
		//		});

		var kundenTemplate = new sap.m.StandardListItem({
			title : "{Kunde}"
		});

		var layout = new sap.ui.layout.HorizontalLayout();

		var items = {
			path : "/Kunde/",
			template : kundenTemplate
		}

		var items2 = {
			path : "/Kunde/",
			template : kundenTemplate
		}

		var oList1 = new sap.m.List({
			headerText : "In Bearbeitung",
			items : items
		});

		var oList2 = new sap.m.List({
			headerText : "Done",
			items : items2
		});

		layout.addContent(oList1);
		layout.addContent(oList2);

		// Konflikt mit BusyIndicator
		oList2.onAfterRendering = function() {
			$("#__list3-listUl, #__list4-listUl").sortable({
				connectWith : ".sapMListUl"
			}).disableSelection();
			this.setBusy(false);
		}

		// TODO Model, Datum, draggable
		// TDOD Titel: Kunde/Projekt/Sprint

		return new sap.m.Page({
			title : "scrumUI5",
			content : layout
		});
	}

});