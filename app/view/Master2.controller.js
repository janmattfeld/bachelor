sap.ui.core.mvc.Controller.extend("de.abat.scrumui5.view.Master2", {

	onInit : function() {
		this.getRouter().attachRouteMatched(this.onRouteMatched, this);
	},

	onRouteMatched : function(oEvent) {
		var oParameters = oEvent.getParameters();
		var sName = oEvent.getParameter("name");
		var oView = this.getView();

		if (sName === "master2") {
			var sEntityPath = "/" + oParameters.arguments.entity;
			this.bindView(sEntityPath);

			var oEventBus = this.getEventBus();
			var that = this;
			oView.getModel().attachRequestCompleted(function() {
				if (jQuery("#" + that.getView().getId()).is(':visible')) {
					oEventBus.publish("Master2", "LoadFinished", {
						oListItem : that.getView().byId("master2List").getItems()[0]
					});
				}
			});
		}
		
		if (sName === "master2" && !jQuery.device.is.phone) {
			this.getRouter().myNavToWithoutHash({
				currentView : this.getView(),
				targetViewName : "de.abat.scrumui5.view.Welcome",
				targetViewType : "XML",
			});
		}
	},

	bindView : function(sEntityPath) {
		var oView = this.getView();
		// Bind element selected in master1
		// Access sub-elements via items path defined in view
		// Uses navigation property of OData service
		// https://sapui5.netweaver.ondemand.com/sdk/#docs/guide/
		// 91f05e8b6f4d1014b6dd926db0e91070.html
		oView.bindElement(sEntityPath);
		// Check if the data is already on the client
		if (!oView.getModel().getData(sEntityPath)) {
			// Check that the entity specified was found
			oView.getElementBinding().attachEventOnce("dataReceived", jQuery.proxy(function() {
				var oData = oView.getModel().getData(sEntityPath);
				if (!oData) {
					// TODO Show Error Message in Master
					this.showEmptyView();
					this.fireDetailNotFound();
				}
			}, this));
		}
	},

	onNavBack : function() {
		// This is only relevant when running on phone devices
		this.getRouter().myNavBack("main");
	},

	onSearch : function() {
		// Add search filter
		var filters = [];
		var searchString = this.getView().byId("master2SearchField").getValue();
		if (searchString && searchString.length > 0) {
			filters = [ new sap.ui.model.Filter("Bezei", sap.ui.model.FilterOperator.Contains, searchString) ];
		}

		// Update list binding
		this.getView().byId("master2List").getBinding("items").filter(filters);
	},

	onSelect : function(oEvent) {
		// Get the list item either from the listItem parameter or from the
		// event's source itself (will depend on the device-dependent mode)
		this.showDetail(oEvent.getParameter("listItem") || oEvent.getSource());
	},

	onRefresh : function(oEvent) {
		var that = this;
		// Trigger search again and hide pullToRefresh when data ready
		var oProductList = this.getView().byId("master2List");
		var oBinding = oProductList.getBinding("items");
		var fnHandler = function() {
			that.getView().byId("master2PullToRefresh").hide();
			oBinding.detachDataReceived(fnHandler);
		};
		oBinding.attachDataReceived(fnHandler);
		this.onSearch();
	},

	showDetail : function(oItem) {
		// If we're on a phone device, include nav in history
		var bReplace = jQuery.device.is.phone ? false : true;
		this.getRouter().navTo("master3", {
			from : "master2",
			entity : oItem.getBindingContext().getPath().substr(1)
		}, bReplace);
	},

	getEventBus : function() {
		return sap.ui.getCore().getEventBus();
	},

	getRouter : function() {
		return sap.ui.core.UIComponent.getRouterFor(this);
	}

});
