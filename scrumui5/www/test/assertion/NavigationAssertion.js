sap.ui.define([ 'sap/ui/test/Opa5', 'sap/ui/test/matchers/AggregationLengthEquals', 'sap/ui/test/matchers/PropertyStrictEquals' ], function(Opa5, AggregationLengthEquals, PropertyStrictEquals) {

	"use strict";

	return Opa5.extend("de.abat.scrumui5.test.assertion.NavigationAssertion", {

		iShouldSeeTheCustomerList : function() {
			return this.waitFor({
				id : "list",
				viewName : "Master",
				success : function(oList) {
					this.getContext().oCustomerList = oList;
					ok(oList, "Found the customer list");
				}
			});
		},

		iShouldSeeTheProjectList : function() {
			return this.waitFor({
				id : "master2List",
				viewName : "Master2",
				success : function(oList) {
					this.getContext().oProjectList = oList;
					ok(oList, "Found the project list");
				}
			});
		},

		iShouldSeeTheSprintList : function() {
			return this.waitFor({
				id : "master3List",
				viewName : "Master3",
				success : function(oList) {
					this.getContext().oSprintList = oList;
					ok(oList, "Found the sprint list");
				}
			});
		},

		iShouldBeTakenToTheSecondCustomer : function() {
			return this.waitFor({
				id : "master2Page-title",
				viewName : "Master2",
				success : function() {
					ok(true, "I was taken to the project list of the second customer");
				},
				errorMessage : "I was NOT taken to the project list of the second customer",
				check : function(oTitle) {
					return oTitle.getText() === "TKMI";
				}
			});
		},

		iShouldBeTakenToTheFifthProject : function() {
			return this.waitFor({
				id : "master3Page-title",
				viewName : "Master3",
				success : function() {
					ok(true, "I was taken to the sprint list of the fifth project");
				},
				errorMessage : "I was NOT taken to the sprint list of the fifth project",
				check : function(oTitle) {
					return oTitle.getText() === "TM@TKMI SCRUM Aufgaben";
				}
			});
		},

		theCustomerListShouldHaveSomeEntries : function() {
			return this.waitFor({
				check : function() {
					return this.getContext().oCustomerList.getItems().length > 0;
				},
				success : function() {
					ok(true, "Customer list did contain entries");
				},
				errorMessage : "The customer list did not contain entries"
			});
		},

		theCustomerListShouldHaveOnlyOneEntry : function() {
			return this.waitFor({
				check : function() {
					var iCustomerListLength = this.getContext().oCustomerList.getItems().length;
					return iCustomerListLength > 0 && iCustomerListLength < 2;
				},
				success : function() {
					ok(true, "Customer list did contain only 1 entry");
				},
				errorMessage : "The customer list did contain more than 1 entry"
			});
		},
		
		theCustomerListShouldHaveNoEntries : function() {
			return this.waitFor({
				check : function() {
					var iCustomerListLength = this.getContext().oCustomerList.getItems().length;
					return iCustomerListLength === 0;
				},
				success : function() {
					ok(true, "Customer list did contain no entries");
				},
				errorMessage : "The customer list did contain entries"
			});
		},

		theProjectListShouldHaveSomeEntries : function() {
			return this.waitFor({
				check : function() {
					return this.getContext().oProjectList.getItems().length > 0;
				},
				success : function() {
					ok(true, "Project list did contain entries");
				},
				errorMessage : "The project list did not contain entries"
			});
		},

		theSprintListShouldHaveSomeEntries : function() {
			return this.waitFor({
				check : function() {
					return this.getContext().oSprintList.getItems().length > 0;
				},
				success : function() {
					ok(true, "Sprint list did contain entries");
				},
				errorMessage : "The sprint list did not contain entries"
			});
		},

		iShouldSeeAListItem : function(sViewName, sListId, sItemTitle) {
			return this.waitFor({
				viewName : "Master",
				id : "list",
				success : function(oList) {
					return oList.getItems().some(function(oItem) {
						if (oItem.getTitle() === sItemTitle) {
							ok(oList, "Found the item " + sItemTitle + " in list " + sListId);
						}
						return false;
					});
				},
				errorMessage : "Did not find the item " + sItemTitle + " in list " + sListId
			});
		},

		iShouldSeeTheTyssenKruppListItem : function(sViewName, sListId, sItemTitle) {
			return this.iShouldSeeAListItem("Master", "list", "ThyssenKrupp");
		}

	});
});