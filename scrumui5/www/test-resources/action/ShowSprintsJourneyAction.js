jQuery.sap.declare("de.abat.scrumui5.test.action.ShowSprintsJourneyAction");
jQuery.sap.require("sap.ui.test.Opa5");
jQuery.sap.require("sap.ui.test.matchers.PropertyStrictEquals");

de.abat.scrumui5.test.action.ShowSprintsJourneyAction = sap.ui.test.Opa5.extend("de.abat.scrumui5.test.action.ShowSprintsJourneyAction", {

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
	
	iAddTheDisplayedProductToTheCart : function() {
		var oAddButton = null;
		return this.waitFor({
			viewName : "Product",
			controlType : "sap.m.Button",
			check : function(aButtons) {
				return aButtons && aButtons.some(function(oButton) {
					if (oButton.getText() === "Add to Cart") {
						oAddButton = oButton;
						return true;
					}
					return false;
				}, this);
			},
			success : function() {
				Opa5.getUtils().triggerTouchEvent("tap", oAddButton.getDomRef());
			},
			errorMessage : "Did not find the Add to Cart button"
		});
	},

	iGoToTheCartPage : function() {
		return this.waitFor({
			controlType : "sap.m.Button",
			matchers : new sap.ui.test.matchers.PropertyStrictEquals({
				name : "icon",
				value : "sap-icon://cart"
			}),
			success : function(aButtons) {
				Opa5.getUtils().triggerTouchEvent("tap", aButtons[0].getDomRef());
			},
			errorMessage : "did not find the cart button"
		});
	},

	iLookAtTheScreen : function() {
		return this;
	},

	iPressOnNavBackToMaster : function() {
		return this.waitFor({
			viewName : "Master2",
			id : "master2Page-navButton",
			success : function(oButton) {
				oButton.$().trigger("tap");
			}
		});
	},

	iPressOnNavBackToMaster2 : function() {
		return this.waitFor({
			viewName : "Master3",
			id : "master3Page-navButton",
			success : function(oButton) {
				oButton.$().trigger("tap");
			}
		});
	},
	
	iPressOnTheProceedButton : function() {

		return this.waitFor({
			viewName : "Cart",
			id : "proceedButton",
			success : function(oButton) {
				oButton.$().trigger("tap");
			}
		});

	},

	iFillTheForm : function() {
		return this.waitFor({
			viewName : "Order",
			id : [ "inputName", "inputAddress", "inputMail", "inputNumber" ],
			success : function(aControls) {
				aControls[0].setValue("MyName");
				aControls[1].setValue("MyAddress");
				aControls[2].setValue("me@example.com");
				aControls[3].setValue("1234567891234");
			},
			errorMessage : "Did not find the Order Now button"
		});
	},

	iPressOrderNow : function() {
		return this.waitFor({
			searchOpenDialogs : true,
			controlType : "sap.m.Button",
			matchers : [ new sap.ui.test.matchers.PropertyStrictEquals({
				name : "text",
				value : "Order Now",
			}), new sap.ui.test.matchers.PropertyStrictEquals({
				name : "enabled",
				value : true,
			}), ],
			success : function(aButtons) {
				aButtons[0].$().trigger("tap");
			},
			errorMessage : "Did not find the Order Now button"
		});
	}
});