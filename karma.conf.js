// Karma configuration
// Generated on Sat Aug 29 2015 09:05:38 GMT-0400 (EDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'static/components/angular/angular.js',
      'static/components/angular-mocks/angular-mocks.js',
      'static/components/angular-animate/angular-animate.js',
      'static/components/angular-resource/angular-resource.js',
      'static/components/angular-jwt/dist/angular-jwt.js',
      'static/components/a0-angular-storage/dist/angular-storage.js',
      'static/components/angular-ui-router/release/angular-ui-router.js',
      'static/components/lodash/lodash.js',


      'static/js/*.js',
      'static/js/**/*.js',
      'static/js/test/*.js',
      'static/js/test/**/*.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [
		// 'Chrome',
		// 'Firefox',
		'PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  })
}
