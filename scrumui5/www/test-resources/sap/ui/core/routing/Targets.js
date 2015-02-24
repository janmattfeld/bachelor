// Copyright (c) 2013 SAP SE, All Rights Reserved
sap.ui.define(['jquery.sap.global', 'sap/ui/base/EventProvider', './Target'],
	function($, EventProvider, Target) {
		"use strict";

		//TODO: make public later
		/**
		 *  provides a convenient way for placing views into the correct containers of your application.
		 *  If you are using the mobile library, please use {@link sap.m.routing.Targets} instead of this class.
		 *
		 * @class
		 * @extends sap.ui.base.EventProvider
		 * @param {object} oOptions
		 * @param {sap.ui.core.routing.Views} oOptions.views the views instance will create the views of all the targets defined, so if 2 targets have the same viewname, the same instance will be displayed
		 * @param {object} [oOptions.config] this config allows all the values oOptions.targets.anyName allows, these will be the default values for properties used in the target. For example if you are only xmlviews in your app you can specify viewType="XML" so you don't have to repeat this in every target. If a target specifies viewType="JS", the JS will be stronger than the XML.
		 * @param {object} oOptions.targets Multiple targets that may be displayed in a view
		 * @param {object} oOptions.targets.anyName a new target, the key severs as a name eg: {myTarget : {params} } - myTarget would be the name of the target you may use to display it. Params is another object that will be passed to the constructor of {@link sap.ui.core.routing.Target#constructor}. The allowed parameters are documented there.
		 * @param {object} [oOptions.targets.anyName.children] the same object allowed in options.targets again. eg: { myTarget :  { ... children : { myChildTarget : {  &lt; parameters again &gt;} }  }  }. in this config 2 targets will be created: myTarget and myChildTarget. If you display myChildTarget, myTarget will also be displayed. If you display myTarget, myChildTarget will not be displayed.
		 * @since 1.28
		 * @private
		 * @alias sap.ui.core.routing.Targets
		 */
		return EventProvider.extend("sap.ui.core.routing.Targets", {

			constructor : function(oOptions) {
				var sTargetOptions;

				EventProvider.apply(this);
				this._mTargets = {};
				this._oConfig = oOptions.config;
				this._oViews = oOptions.views;

				for (sTargetOptions in oOptions.targets) {
					if (oOptions.targets.hasOwnProperty(sTargetOptions)) {
						this._createTarget(sTargetOptions, oOptions.targets[sTargetOptions]);
					}
				}

			},

			/**
			 * Destroys the targets instance an all created targets. Does not destroy the views instance passed to the constructor. It has to be destroyed separately.
			 *
			 * @public
			 * @returns { sap.ui.core.routing.Route } this for chaining.
			 */
			destroy : function () {
				var sTargetName;
				EventProvider.prototype.destroy.apply(this);

				for (sTargetName in this._mTargets) {
					if (this._mTargets.hasOwnProperty(sTargetName)) {
						this._mTargets[sTargetName].destroy();
					}
				}

				this._mTargets = null;
				this._oViews = null;
				this._oConfig = null;
				this.bIsDestroyed = true;

				return this;
			},

			/**
			 * recursively creates targets and their children
			 *
			 * @param {string} sName
			 * @param {object} oTargetOptions
			 * @param {sap.ui.core.routing.Target} [oParent]
			 * @private
			 */
			_createTarget : function (sName, oTargetOptions, oParent) {
				var sChildName,
					oTarget,
					oOptions;

				oOptions = $.extend(true, {}, this._oConfig, oTargetOptions);
				oTarget = new Target(oOptions, this._oViews, oParent);
				oTarget.attachDisplay(function (oEvent) {
					var oParameters = oEvent.getParameters();

					this.fireDisplay({
						name : sName,
						view : oParameters.view,
						targetControl : oParameters.targetControl,
						config : oParameters.config
					});
				}, this);
				this._mTargets[sName] = oTarget;

				for (sChildName in oTargetOptions.children) {
					if (oTargetOptions.children.hasOwnProperty(sChildName)) {
						this._createTarget(sChildName, oTargetOptions.children[sChildName], oTarget);
					}
				}
			},

			/**
			 * Creates a view and puts it in an aggregation of the specified control.
			 *
			 * @param {string|string[]} vTargets the key of the target as specified in the {@link #constructor}. To display multiple targets you may also pass an array of keys.
			 * @param {any} [vData] an object that will be passed to the display event in the data property. If the target has parents, the data will also be passed to them.
			 * @public
			 * @returns {sap.ui.core.routing.Targets} this pointer for chaining
			 */
			display : function (vTargets, vData) {
				var that = this;

				if ($.isArray(vTargets)) {
					$.each(vTargets, function (i, sTarget) {
						that._displaySingleTarget(sTarget, vData);
					});
				} else {
					this._displaySingleTarget(vTargets, vData);
				}

				return this;
			},

			_displaySingleTarget : function (sName, vData) {
				var oTarget = this.getTarget(sName);

				if (oTarget !== undefined) {
					oTarget.display(vData);
				} else {
					$.sap.log.error("The target with the name \"" + sName + "\" does not exist!", "sap.ui.core.routing.Targets");
				}
			},

			/**
			 * Returns a target by its name (if you pass myTarget: { view: "myView" }) in the config myTarget is the name.
			 *
			 * @param {string|string[]} vName the name of a single target or the name of multiple targets
			 * @return {sap.ui.core.routing.Target|undefined|sap.ui.core.routing.Target[]} The target with the coresponding name or undefined. If an array way passed as name this will return an array with all found targets. Non existing targets will not be returned but will log an error.
			 */
			getTarget : function (vName) {
				var that = this,
					aResult = [];

				if ($.isArray(vName)) {
					$.each(vName, function (i, sName) {
						var oTarget = that._mTargets[sName];

						if (oTarget) {
							aResult.push(oTarget);
						} else {
							$.sap.log.error("The target you tried to get \"" + sName + "\" does not exist!", "sap.ui.core.routing.Targets");
						}
					});
					return aResult;
				}

				return this._mTargets[vName];
			},


			/**
			 * Will be fired when a target is displayed
			 *
			 * Could be triggered by calling the display function or by the @link sap.ui.core.routing.Router when a target is referenced in a matching route.
			 *
			 * @param {object} oEvent
			 * @param {object} oEvent.getParameters
			 * @param {object} oEvent.getParameters.view The view that got displayed.
			 * @param {object} oEvent.getParameters.targetControl The control that now contains the view in the targetAggregation
			 * @param {object} oEvent.getParameters.name The name of the target firing the event
			 * @event
			 * @public
			 */

			/**
			 * Attach event-handler <code>fnFunction</code> to the 'display' event of this <code>sap.ui.core.routing.Target</code>.<br/>
			 * @param {object} [oData] The object, that should be passed along with the event-object when firing the event.
			 * @param {function} fnFunction The function to call, when the event occurs. This function will be called on the
			 * oListener-instance (if present) or in a 'static way'.
			 * @param {object} [oListener] Object on which to call the given function.
			 *
			 * @return {sap.ui.core.routing.Targets} <code>this</code> to allow method chaining
			 * @public
			 */
			attachDisplay : function(oData, fnFunction, oListener) {
				return this.attachEvent(this.M_EVENTS.DISPLAY, oData, fnFunction, oListener);
			},

			/**
			 * Detach event-handler <code>fnFunction</code> from the 'created' event of this <code>sap.ui.core.routing.Views</code>.<br/>
			 *
			 * The passed function and listener object must match the ones previously used for event registration.
			 *
			 * @param {function} fnFunction The function to call, when the event occurs.
			 * @param {object} oListener Object on which the given function had to be called.
			 * @return {sap.ui.core.routing.Targets} <code>this</code> to allow method chaining
			 */
			detachDisplay : function(fnFunction, oListener) {
				return this.detachEvent(this.M_EVENTS.DISPLAY, fnFunction, oListener);
			},

			/**
			 * Fire event created to attached listeners.
			 *
			 * @param {object} [mArguments] the arguments to pass along with the event.
			 * @return {sap.ui.core.routing.Targets} <code>this</code> to allow method chaining
			 */
			fireDisplay : function(mArguments) {
				return this.fireEvent(this.M_EVENTS.DISPLAY, mArguments);
			},

			M_EVENTS : {
				DISPLAY : "display"
			}

		});

	}, /* bExport= */ true);
