module.exports = function (config) {
	config.set({

		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: '',


		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['qunit', 'openui5'],


		// OpenUI5
		openui5: {
			path: 'bower_components/openui5-sap.ui.core/resources/sap-ui-core.js',
			useMockServer: true
		},

		client: {
			openui5: {
				config: {
					theme: 'sap_bluecrystal',
					libs: 'sap.m',
					resourceroots: {
						'sap.m': '/base/bower_components/openui5-sap.m/resources/sap/m',
						'de.abat.scrumui5.test': '/base/test',
						'de.abat.scrumui5': '/base/app'
					},
					themeroots: {
						'sap_bluecrystal': '/base/bower_components/openui5-themelib_sap_bluecrystal/resources'
					},
					mockserver: {
						config: {
							autoRespond: true
						},
						rootUri: 'http://jam:Nlcfwv3@abat-ect.bremen.abat.de:8000/sap/opu/odata/sap/Z_ZAV_SCRUM_SRV/',
						metadataURL: '/base/test/service/metadata.xml',
						mockdataSettings: '/base/test/service'
					},
					preload: ''
				}
			}
		},

		// list of files / patterns to load in the browser
		files: [{
			pattern: 'bower_components/openui5-sap.ui.core/resources/**/*',
			served: true,
			included: false,
			watched: false
		}, {
			pattern: 'bower_components/openui5-sap.m/resources/**/*',
			served: true,
			included: false,
			watched: false
		}, {
			pattern: 'bower_components/openui5-sap.ui.layout/resources/**/*',
			served: true,
			included: false,
			watched: false
		}, {
			pattern: 'bower_components/openui5-themelib_sap_bluecrystal/resources/**/*',
			served: true,
			included: false,
			watched: false
		}, {
			pattern: 'app/**/*',
			served: true,
			included: false,
			watched: true
		}, {
			pattern: 'test/action/*',
			served: true,
			included: true,
			watched: true
		}, {
			pattern: 'test/arrangement/*',
			served: true,
			included: true,
			watched: true
		}, {
			pattern: 'test/assertion/*',
			served: true,
			included: true,
			watched: true
		}, {
			pattern: 'test/*.js',
			served: true,
			included: true,
			watched: true
		}, {
			pattern: 'test/service/*',
			served: true,
			included: false,
			watched: true
		}],


		// list of files to exclude
		exclude: [],


		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {
			'app/**/*.js': ['coverage']
		},


		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ['progress', 'coverage'],


		// web server port
		port: 9876,


		// enable / disable colors in the output (reporters and logs)
		colors: true,


		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		//logLevel: config.LOG_INFO,


		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: true,


		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: ['Chrome'],


		// Continuous Integration mode
		// Also for WebStorm (use integrated auto-test instead)
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: true
	});
};
