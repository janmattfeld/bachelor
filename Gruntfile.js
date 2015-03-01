/*
 * Copyright (c) 2015 abat AG
 */

"use strict";

module.exports = function (grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		karma: {
			unit: {
				// TODO: Use config file only
				configFile: 'karma.conf.js',
				options: {
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
								themeroots: {'sap_bluecrystal': '/base/bower_components/openui5-themelib_sap_bluecrystal/resources'},
								mockserver: {
									config: {autoRespond: true},
									rootUri: 'http://jam:Nlcfwv3@abat-ect.bremen.abat.de:8000/sap/opu/odata/sap/Z_ZAV_SCRUM_SRV/',
									metadataURL: '/base/test/service/metadata.xml',
									mockdataSettings: '/base/test/service'
								},
								preload: ''
							}
						}
					},
					preprocessors: {'app/**/*.js': ['coverage']},
					reporters: ['progress', 'coverage'],
					coverageReporter: {type: 'cobertura', dir: 'test-reports/'}
				}

			}
		},
		uglify: {
			min: {
				options: {
					mangle: true,
					banner: '/*! \n'
					+ ' * <%= pkg.description %> v<%= pkg.version %>\n'
					+ ' * Copyright (c) 2015 abat AG\n'
					+ ' * Date: <%= grunt.template.today("yyyy-mm-dd") %>\n'
					+ ' */\n'
				},
				files: grunt.file.expandMapping(['app/**/*.js', 'test/**/*.js', '!app/**/*.min.*', '!test/**/*.min.*'], '', {
					rename: function (destBase, destPath) {
						return destBase + destPath.replace('.js', '.min.js');
					}
				})
			},
			beautify: {
				options: {beautify: true, mangle: false},
				files: grunt.file.expandMapping(['app/**/*.js', 'test/**/*.js'], '', {
					rename: function (destBase, destPath) {
						return destBase + destPath;
					}
				})
			}
		},
				
		compress: {
			main: {
				options: {
					archive: 'app.zip'
				},
				files: [
					{
						src: ['config.xml'],
						dest: './www',
						filter: 'isFile'
					},
					{
						expand: true,
						cwd: 'app',
						src: ['**'],
						dest: 'www'
					},
					{
						expand: true,
						cwd: 'bower_components/openui5-mobile/resources',
						src: ['**', '!*dbg.js'],
						dest: 'www/resources/'
					}
				]
			}
		},

		"phonegap-build": {
			main: {
				options: {
					archive: "app.zip",
					"appId": "1334667",
					"user": {
						"email": "max@azimi.de",
						"password": "phonegapbuild"
					}
				}
			}
		},
		
		eslint: {
			options: {
				configFile: '.eslintrc',
				ignoreFile: '.eslintignore',
				quiet: false,
				format: 'checkstyle',
				outputFile: 'test-reports/eslint-cov.xml'

			}, target: ['app/**/*.js', 'test/**/*.js']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-eslint');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-phonegap-build');
	

	grunt.registerTask('default', ['eslint', 'karma:unit:start']);
	grunt.registerTask('beautify', ['uglify:beautify']);
	grunt.registerTask('build', ['uglify:min', 'compress', 'phonegap-build']);
	grunt.registerTask('complete' ['eslint', 'karma:unit:start', 'uglify:min', 'compress', 'phonegap-build']);
};
