module.exports = function (config) {
	config.set({
		frameworks: ['qunit', 'openui5'],
		openui5: {
			path: 'bower_components/openui5-sap.ui.core/resources/sap-ui-core.js',
			useMockServer: true
		},
		files: [{
			pattern: 'bower_components/openui5/**/*',
			served: true,
			included: false,
			watched: false
		}, {
			pattern: 'app/**/*',
			served: true,
			included: false,
			watched: true
		}, {
			pattern: 'test/**/*',
			served: true,
			included: true,
			watched: true
		}],
		preprocessors: {
			'app/**/*.js': ['coverage']
		},
		reporters: ['progress', 'coverage']
		autoWatch: false,
		browsers: ['Chrome']
		singleRun: true
	});
};
