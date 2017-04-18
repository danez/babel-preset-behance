module.exports = function(context, opts) {
  const isTest = context.cache(() => (process.env.BABEL_ENV || process.env.NODE_ENV) === 'test');
  const isCoverage = context.cache(() => !!process.env.COVERAGE);

  opts = opts || {};
  const envOpts = opts.env || {};

  if (!envOpts.exclude) {
    envOpts.exclude = ['transform-regenerator'];
  }
  else {
    envOpts.exclude.push('transform-regenerator');
  }

  if (!('modules' in envOpts)) {
    envOpts.modules = false;
  }

  const config = {
    presets: [
      [require('babel-preset-env'), envOpts],
      require('babel-preset-stage-3'),
    ],
    plugins: [],
  };

  if (isTest) {
    if (isCoverage) {
      config.plugins.push(require('babel-plugin-istanbul').default);
    }
    config.plugins.push(require('babel-plugin-rewire'));
  }

  return config;
};
