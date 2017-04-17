module.exports = function(context, opts) {
  var env = process.env.BABEL_ENV || process.env.NODE_ENV;
  opts = opts || {};
  var envOpts = opts.env || {};

  if (!envOpts.exclude) {
    envOpts.exclude = ['transform-regenerator'];
  }
  else {
    envOpts.exclude.push('transform-regenerator');
  }

  if (!('modules' in envOpts)) {
    envOpts.modules = false;
  }

  var config = {
    presets: [
      [require('babel-preset-env'), envOpts],
      require('babel-preset-stage-3'),
    ],
    plugins: [],
  };

  if (env === 'test') {
    if (process.env.COVERAGE) {
      config.plugins.push(require('babel-plugin-istanbul').default);
    }
    config.plugins.push(require('babel-plugin-rewire'));
  }

  return config;
};
