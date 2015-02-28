'use strict';

sap.ui.require(
	[
		'sap/ui/test/Opa5',
		'sap/ui/test/opaQunit',
		'de/abat/scrumui5/test/action/NavigationAction',
		'de/abat/scrumui5/test/arrangement/NavigationArrangement',
		'de/abat/scrumui5/test/assertion/NavigationAssertion'
	],
	function (Opa5, opaQunit, NavigationAction, NavigationArrangement, NavigationAssertion) {

		Opa5.extendConfig({
			actions: new NavigationAction(),
			arrangements: new NavigationArrangement(),
			assertions: new NavigationAssertion(),
			viewNamespace: "de.abat.scrumui5.view."
		});

		module("Desktop navigation");

		opaTest("Should see the customer list", function (Given, When, Then) {
			// Arrangements
			//Given.GivenIStartTheAppOnADesktopDevice();
			Given.iStartAComponent('de.abat.scrumui5');

			// Actions
			When.iLookAtTheScreen();

			// Assertions
			Then.iShouldSeeTheCustomerList().
				and.theCustomerListShouldHaveSomeEntries();
		});

		opaTest("Should see the project list", function (Given, When, Then) {
			// Actions
			When.iPressOnTheSecondCustomer();

			// Assertions
			Then.iShouldBeTakenToTheSecondCustomer().
				and.iShouldSeeTheProjectList().
				and.theProjectListShouldHaveSomeEntries();
		});

		opaTest("Should see the sprint list", function (Given, When, Then) {
			// Actions
			When.iPressOnTheFifthProject();

			// Assertions
			Then.iShouldBeTakenToTheFifthProject().
				and.iShouldSeeTheSprintList().
				and.theSprintListShouldHaveSomeEntries();
		});

		opaTest("Should get back to project list", function (Given, When, Then) {
			// Actions
			When.iPressOnNavBackToMaster2();

			// Assertions
			Then.iShouldBeTakenToTheSecondCustomer().
				and.iShouldSeeTheProjectList().
				and.theProjectListShouldHaveSomeEntries();
		});

		opaTest("Should get back to customer list", function (Given, When, Then) {
			// Actions
			When.iPressOnNavBackToMaster();

			// Assertions
			Then.iShouldSeeTheCustomerList().
				and.theCustomerListShouldHaveSomeEntries().
				and.iTeardownMyAppFrame();
		});
	});
