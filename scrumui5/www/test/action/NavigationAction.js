sap.ui.define(['sap/ui/test/Opa5'],function(Opa5) {
	
	"use strict";
	
	return Opa5.extend("de.abat.scrumui5.test.action.NavigationAction", {
	
		iPressAListItem : function(sViewName, sListId, sObjectTitle) {
			var oObjectListItem = null;
			return this.waitFor({
				id : sListId,
				viewName : sViewName,
				check : function(oList) {
					return oList.getItems().some(function(oItem) {
						if (oItem.getTitle() === sObjectTitle) {
							oObjectListItem = oItem;
							return true;
						}
						return false;
					});
				},
				success : function(oList) {
					oObjectListItem.$().trigger("tap");
					ok(oList, "Pressed ObjectListItem '" + sObjectTitle + "' in list '" + sListId + "' in view '" + sViewName + "'.");
				},
				errorMessage : "List '" + sListId + "' in view '" + sViewName + "' does not contain an ObjectListItem with title '" + sObjectTitle + "'"
			});
		},
	
		iPressOnTheFirstProject : function() {
			var oFirstItem = this.getContext().oProjectList.getItems()[0];
			this.getContext().sProductName = oFirstItem.getTitle();
			oFirstItem.$().trigger("tap");
			return this;
		},
	
		iPressOnTheSecondCustomer : function(sCustomerName) {
			var oSecondItem = this.getContext().oCustomerList.getItems()[1];
			this.getContext().sCustomerName = oSecondItem.getTitle();
			oSecondItem.$().trigger("tap");
			return this;
		},
	
		iPressOnTheFifthProject : function(sProjectName) {
			var oFifthItem = this.getContext().oProjectList.getItems()[4];
			this.getContext().sProjectName = oFifthItem.getTitle();
			oFifthItem.$().trigger("tap");
			return this;
		},
	
		iPressTheNavButton : function(sViewName, sPageId) {
			return this.waitFor({
				viewName : sViewName,
				id : sPageId,
				success : function(oPage) {
					oPage.$("navButton").trigger("tap");
				},
				errorMessage : "Did not find the nav button on page " + sViewName
			});
		},
	
		iPressOnNavBackToMaster : function() {
			return this.iPressTheNavButton("Master2", "master2Page");
		},
	
		iPressOnNavBackToMaster2 : function() {
			return this.iPressTheNavButton("Master3", "master3Page");
		},
	
		iPressAButton : function(sViewName, sIcon) {
			return this.waitFor({
				controlType : "sap.m.Button",
				viewName : sViewName,
				matchers : [ new Opa5.matchers.PropertyStrictEquals({
					name : "icon",
					value : sIcon
				}) ],
				success : function(aButtons) {
					aButtons[0].$().trigger("tap");
				},
				errorMessage : "'" + sIcon + "' button not found."
			});
		},
	
		iEnterText : function(sViewName, sControlId, sText) {
			return this.waitFor({
				viewName : sViewName,
				id : sControlId,
				success : function(oControl) {
					oControl.setValue(sText);
				},
				errorMessage : "Did not find the Text Field"
			});
		},
	
		iEnterTheSearchString : function(sViewName, sSearch) {
			return this.iEnterText(sViewName, "searchField", sSearch);
		},
	
		iEnterThyssenIntoTheSearchField : function() {
			return this.iEnterTheSearchString("Master", "Thyssen");
		},
	
		iPressTheSearchCustomerButton : function(sViewName, sPageId) {
			return this.waitFor({
				viewName : "Master",
				id : "searchField",
				success : function(oSearchField) {
					$(oSearchField).trigger("onSearch");
				},
				errorMessage : "Did not find the search button on page "
			});
		},
	
		iLookAtTheScreen : function() {
			return this;
		}
	});
});