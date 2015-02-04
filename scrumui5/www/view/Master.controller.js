sap.ui.core.mvc.Controller.extend("de.abat.scrumui5.view.Master", {

	onInit : function() {

		this.oInitialLoadFinishedDeferred = jQuery.Deferred();

		var oEventBus = this.getEventBus();

		this.getView().byId("list").attachEventOnce("updateFinished", function() {
			this.oInitialLoadFinishedDeferred.resolve();
			oEventBus.publish("Master", "InitialLoadFinished", {
				oListItem : this.getView().byId("list").getItems()[0]
			});
			this.getRouter().detachRoutePatternMatched(this.onRouteMatched, this);
		}, this);

		// On phone devices, there is nothing to select from the list. There is
		// no need to attach events.
		if (sap.ui.Device.system.phone) {
			return;
		}

		this.getRouter().attachRoutePatternMatched(this.onRouteMatched, this);

		oEventBus.subscribe("Master2", "NotFound", this.onNotFound, this);
	},

	onRouteMatched : function(oEvent) {
		var sName = oEvent.getParameter("name");

		if (sName !== "main") {
			return;
		}
	},

	waitForInitialListLoading : function(fnToExecute) {
		jQuery.when(this.oInitialLoadFinishedDeferred).then(jQuery.proxy(fnToExecute, this));
	},

	onNotFound : function() {
		this.getView().byId("list").removeSelections();
	},

	onSearch : function() {
		// Add search filter
		var filters = [];
		var searchString = this.getView().byId("searchField").getValue();
		if (searchString && searchString.length > 0) {
			filters = [ new sap.ui.model.Filter("Bezei", sap.ui.model.FilterOperator.Contains, searchString) ];
		}

		// Update list binding
		this.getView().byId("list").getBinding("items").filter(filters);
	},

	onRefresh : function(oEvent) {
		// TODO On error? Hide bar and show error
		var that = this;
		// Trigger search again and hide pullToRefresh when data ready
		var oProductList = this.getView().byId("list");
		var oBinding = oProductList.getBinding("items");
		var fnHandler = function() {
			that.getView().byId("pullToRefresh").hide();
			oBinding.detachDataReceived(fnHandler);
		};
		oBinding.attachDataReceived(fnHandler);
		this.onSearch();
	},

	onNavBack : function() {
		// This is only relevant when running on phone devices
		this.getRouter().myNavBack("main");
	},

	onSelect : function(oEvent) {
		// Get the list item either from the listItem parameter or from the
		// event's source itself (will depend on the device-dependent mode)
		var oList = this.getView().byId("list");
		this.showDetail(oEvent.getParameter("listItem") || oEvent.getSource());
		oList.removeSelections();
	},

	showDetail : function(oItem) {
		// If we're on a phone device, include nav in history
		var bReplace = jQuery.device.is.phone ? false : true;
		this.getRouter().navTo("master2", {
			from : "main",
			entity : oItem.getBindingContext().getPath().substr(1)
		}, bReplace);
	},

	getEventBus : function() {
		return sap.ui.getCore().getEventBus();
	},

	getRouter : function() {
		return sap.ui.core.UIComponent.getRouterFor(this);
	},

	onExit : function(oEvent) {
		this.getEventBus().unsubscribe("Master2", "NotFound", this.onNotFound, this);
	}
});