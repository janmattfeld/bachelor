jQuery.sap.declare("de.abat.scrumui5.test.assertion.ShowSprintsJourneyAssertion");
jQuery.sap.require("sap.ui.test.Opa5");

de.abat.scrumui5.test.assertion.ShowSprintsJourneyAssertion = sap.ui.test.Opa5.extend("de.abat.scrumui5.test.assertion.ShowSprintsJourneyAssertion", {

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

	iShouldBeTakenToTheFifthProject: function() {
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

	iShouldSeeTheProductInMyCart : function() {
		return this.waitFor({
			viewName : "Cart",
			id : "entryList",
			success : function(oList) {
				strictEqual(oList.getItems()[0].getTitle(), this.getContext().sProductName, "The added Product has the correct Title");
			},
			errorMessage : "Did not find the product in the cart"
		});
	},

	iShouldSeeAnEmptyCart : function() {
		return this.waitFor({
			viewName : "Cart",
			id : "entryList",
			check : function(oList) {
				return oList.getItems().length === 0;
			},
			success : function(oList) {
				strictEqual(oList.getItems().length, 0, "The cart was empty after shopping");
			},
			errorMessage : "The cart still has entries"
		});
	},

	theProceedButtonShouldBeEnabled : function() {
		return this.waitFor({
			viewName : "Cart",
			id : "proceedButton",
			success : function(oButton) {
				ok(oButton.getEnabled(), "The button is enabled");
			},
			errorMessage : "The proceed button was not enabled"
		});
	}
});