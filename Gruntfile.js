module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'), // the package file to use

// taskName: { // internal task or name of a plugin (like "qunit") // // options, etc (see the task/plugin for details) // },

		karma: {
			unit: {
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
					coverageReporter: {type: 'cobertura', dir: 'test-results/'}
				}

			}
		},

		uglify: {
			min: {
				options: {mangle: true},
				files: grunt.file.expandMapping(['app/**/*.js', 'test/**/*.js', '!app/**/*.min.*', '!test/**/*.min.*'], '', {
					rename: function (destBase, destPath) {
						return destBase + destPath.replace('.js', '.min.js');
					}
				})
			},

			beautify: {
				options: {beautify: true, mangle:false},
				files: grunt.file.expandMapping(['app/**/*.js', 'test/**/*.js'], '', {
					rename: function (destBase, destPath) {
						return destBase + destPath
					}
				})
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

// load up your plugins
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-eslint');
	grunt.loadNpmTasks('grunt-karma');
// register one or more task lists (you should ALWAYS have a "default" task list)
	grunt.registerTask('default', ['eslint', 'karma:unit:start', 'uglify:min']);
	grunt.registerTask('beautify', ['uglify:beautify']);
};
