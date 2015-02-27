//sap.ui.define([ 'sap/ui/test/Opa5' ], function(Opa5) {
//
//	"use strict";
//
//	return Opa5.extend("de.abat.scrumui5.test.action.SearchAction", {
//
//		iEnterText : function(sViewName, sControlId, sText) {
//			return this.waitFor({
//				viewName : sViewName,
//				id : sControlId,
//				success : function(oControl) {
//					oControl.setValue(sText);
//				},
//				errorMessage : "Did not find the Text Field"
//			});
//		},
//
//		iEnterTheSearchString : function(sViewName, sSearch) {
//			return this.iEnterText(sViewName, "searchField", sSearch);
//		},
//
//		iEnterThyssenIntoTheSearchField : function() {
//			return this.iEnterTheSearchString("Master", "Thyssen");
//		},
//
//		iEnterSiemensIntoTheSearchField : function() {
//			return this.iEnterTheSearchString("Master", "Siemens");
//		},
//
//		iPressTheSearchCustomerButton : function(sViewName, sPageId) {
//			return this.waitFor({
//				viewName : "Master",
//				id : "searchField",
//				success : function(oSearchField) {
//					$(oSearchField).trigger("onSearch");
//				},
//				errorMessage : "Did not find the search button on page "
//			});
//		}
//	});
//});
