/*global opaTest */
sap.ui.require(
[
	'sap/ui/test/Opa5',
	'de/abat/scrumui5/test/action/NavigationAction',
	'de/abat/scrumui5/test/action/SearchAction',
	'de/abat/scrumui5/test/arrangement/NavigationArrangement',
	'de/abat/scrumui5/test/assertion/NavigationAssertion'
],
function (Opa5, NavigationAction, SearchAction, NavigationArrangement, NavigationAssertion) {
	
	sap.ui.test.Opa5.extendConfig({
		actions : new NavigationAction(),
		arrangements : new NavigationArrangement(),
		assertions : new NavigationAssertion(),
		viewNamespace : "de.abat.scrumui5.view."
	});
	
	module("Desktop navigation");
	
	opaTest("Should see the customer list", function(Given, When, Then) {
		// Arrangements
		Given.GivenIStartTheAppOnADesktopDevice();
	
		// Actions
		When.iLookAtTheScreen();
	
		// Assertions
		Then.iShouldSeeTheCustomerList().
			and.theCustomerListShouldHaveSomeEntries();
	});
	
	opaTest("Should NOT find Siemens", function(Given, When, Then) {
		// Actions
		When.iEnterSiemensIntoTheSearchField().
			and.iPressTheSearchCustomerButton();
	
		// Assertions
		Then.iShouldSeeTheCustomerList().
			and.theCustomerListShouldHaveNoEntries();
	});
	
	opaTest("Should find ThyssenKrupp", function(Given, When, Then) {
		// Actions
		When.iEnterThyssenIntoTheSearchField().
			and.iPressTheSearchCustomerButton();
	
		// Assertions
		Then.iShouldSeeTheCustomerList().
			and.iShouldSeeTheTyssenKruppListItem();
	});
	
});