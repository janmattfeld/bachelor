sap.ui.core.mvc.Controller.extend("de.abat.scrumui5.view.Master3", {

	onInit : function() {
		this.getRouter().attachRouteMatched(this.onRouteMatched, this);

		// On phone devices, there is nothing to select from the list. There is
		// no need to attach events.
		if (!sap.ui.Device.system.phone) {
			this.getRouter().attachRoutePatternMatched(this.onRoutePatternMatched, this);
		}
	},

	onRoutePatternMatched : function(oEvent) {
		var sName = oEvent.getParameter("name");

		if (sName !== "master3") {
			return;
		}		

		// Load the detail view in desktop
		// TODO device model instead of jQuery?
		if (sName === "master3" && !jQuery.device.is.phone) {
			this.getRouter().myNavToWithoutHash({
				currentView : this.getView(),
				targetViewName : "de.abat.scrumui5.view.Welcome",
				targetViewType : "XML",
			});
		}
	},

	onRouteMatched : function(oEvent) {
		var oParameters = oEvent.getParameters();
		var oView = this.getView();

		if (oParameters.name === "master3") {
			var sEntityPath = "/" + oParameters.arguments.entity;
			this.bindView(sEntityPath);

			var oEventBus = this.getEventBus();
			var that = this;
			oView.getModel().attachRequestCompleted(function() {
				if (jQuery("#" + that.getView().getId()).is(':visible')) {
					that.selectFirstItem();
					oEventBus.publish("Master3", "LoadFinished", {
						oListItem : that.getView().byId("master3List").getItems()[0]
					});
				}
			});
		}
		// Load the detail view in desktop
		// TODO device model instead of jQuery?
		if (oParameters.name === "master3" && !jQuery.device.is.phone) {
			this.getRouter().myNavToWithoutHash({
				currentView : this.getView(),
				targetViewName : "de.abat.scrumui5.view.Welcome",
				targetViewType : "XML",
				transition : "slide"
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
					this.showEmptyView();
					this.fireDetailNotFound();
				}
			}, this));
		}
	},

	selectFirstItem : function() {
		var oList = this.getView().byId("master3List");
		var aItems = oList.getItems();
		if (aItems.length) {
			oList.setSelectedItem(aItems[0], true);
		}
	},

	showEmptyView : function() {
		this.getRouter().myNavToWithoutHash({
			currentView : this.getView(),
			targetViewName : "de.abat.scrumui5.view.NotFound",
			targetViewType : "XML"
		});
	},

	fireDetailNotFound : function() {
		this.getEventBus().publish("Master3", "NotFound");
	},

	onNavBack : function() {
		// This is only relevant when running on phone devices
		// Add navigation property path to parent collection
		var oProductList = this.getView().byId("master3List");
		var oBinding = oProductList.getBinding("items");
		var sPath = oBinding.getContext().getPath().substr(1);
		this.getRouter().myNavBack("master2", {
			from : "master3",
			entity : sPath,
		});
	},

	onSearch : function() {
		// Add search filter
		var filters = [];
		var searchString = this.getView().byId("master3SearchField").getValue();
		if (searchString && searchString.length > 0) {
			filters = [ new sap.ui.model.Filter("Sprint", sap.ui.model.FilterOperator.Contains, searchString) ];
		}

		// Update list binding
		this.getView().byId("master3List").getBinding("items").filter(filters);
	},

	onSelect : function(oEvent) {
		// Get the list item either from the listItem parameter or from the
		// event's
		// source itself (will depend on the device-dependent mode)
		this.showDetail(oEvent.getParameter("listItem") || oEvent.getSource());
	},

	onRefresh : function(oEvent) {
		var that = this;
		// Trigger search again and hide pullToRefresh when data ready
		var oProductList = this.getView().byId("master3List");
		var oBinding = oProductList.getBinding("items");
		var fnHandler = function() {
			that.getView().byId("master3PullToRefresh").hide();
			oBinding.detachDataReceived(fnHandler);
		};
		oBinding.attachDataReceived(fnHandler);
		this.onSearch();
	},

	showDetail : function(oItem) {
		// If we're on a phone device, include nav in history
		var bReplace = jQuery.device.is.phone ? false : true;
		this.getRouter().navTo("detail", {
			from : "master",
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
