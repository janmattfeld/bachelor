
module.exports = function (grunt) {
  grunt.initConfig({
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
        files: grunt.file.expandMapping(['target/**/*.js',
            '!target/resources/**/*'], '', {
          rename: function (destBase, destPath) {
            return destBase + destPath.replace('.js', '.min.js');
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

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-eslint');

  grunt.registerTask('complete', ['clean', 'eslint', 'plato',
    'karma:unit:start', 'copy', 'uglify:min', 'compress', 'phonegap-build']);
};
