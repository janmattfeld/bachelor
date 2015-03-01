/*
 * Copyright (c) 2015 abat AG
 */

"use strict";

module.exports = function (config) {

	config.set({
		basePath: '',
		frameworks: ['qunit', 'openui5'],
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
		exclude: [],
		preprocessors: {
			'app/**/*.js': ['coverage']
		},
		reporters: ['progress', 'coverage'],
		port: 9876,
		colors: true,
		// Possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,
		// Watching files and executing tests whenever any file changes
		// Disable for WebStorm (use integrated auto-test instead)
		autoWatch: false,
		browsers: ['Chrome'],
		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: true
	});
};
