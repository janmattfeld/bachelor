sap.ui.controller("scrumui5.scrumBoard", {

	/**
	 * Called when a controller is instantiated and its View controls (if
	 * available) are already created. Can be used to modify the View before it
	 * is displayed, to bind event handlers and do other one-time
	 * initialization.
	 * 
	 * @memberOf scrumui5.scrumBoard
	 */
	// onInit : function() {
	//
	// }
	/**
	 * Similar to onAfterRendering, but this hook is invoked before the
	 * controller's View is re-rendered (NOT before the first rendering!
	 * onInit() is used for that one!).
	 * 
	 * @memberOf scrumui5.scrumBoard
	 */
	onBeforeRendering : function() {
		$(".sapMTile").unbind(
				"draginit dragstart drag dragend");
	},
	/**
	 * Called when the View has been rendered (so its HTML is part of the
	 * document). Post-rendering manipulations of the HTML could be done here.
	 * This hook is the same one that SAPUI5 controls get after being rendered.
	 * 
	 * @memberOf scrumui5.scrumBoard
	 */
	onAfterRendering : function() {
//		$("#__list3-listUl, #__list4-listUl").sortable({
//			connectWith : ".sapMListUl"
//		}).disableSelection();
//		$(".sapMListNoData").sortable( "disable" );
		 
//		$(".sapMTile").draggable({
//			helper : "clone", // TODO use function to drag custom copy
//			axis: "x",
//			containment: ".sapUiMlt"
//		});
	}
/**
 * Called when the Controller is destroyed. Use this one to free resources and
 * finalize activities.
 * 
 * @memberOf scrumui5.scrumBoard
 */
// onExit: function() {
//
// }
});