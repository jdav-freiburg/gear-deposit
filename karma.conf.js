// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

module.exports = function(config) {

  var settings = {
    basePath: '',
    frameworks: ['jasmine', 'angular-cli'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-remap-istanbul'),
      require('karma-spec-reporter'),
      require('angular-cli/plugins/karma')
    ],
    files: [
      { pattern: './src/test.ts', watched: false }
    ],
    preprocessors: {
      './src/test.ts': ['angular-cli']
    },
    mime: {
      'text/x-typescript': ['ts','tsx']
    },
    remapIstanbulReporter: {
      reports: {
        html: 'coverage',
        lcovonly: './coverage/coverage.lcov'
      }
    },
    angularCli: {
      config: './angular-cli.json',
      environment: 'dev'
    },
    reporters: config.angularCli && config.angularCli.codeCoverage
              ? ['spec', 'karma-remap-istanbul']
              : ['spec'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    customLaunchers: {
      Chrome_headless: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
    browsers: ['Chrome'],
    singleRun: false
  };

  if (process.env.TRAVIS) {
    settings.browsers = ['Chrome_headless'];
    settings.singleRun = true;
  }

  config.set(settings);
};
