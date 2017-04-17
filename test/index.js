var preset = require('..');
var expect = require('chai').expect;

describe('babel-preset-behance', function() {
  it('should default to "browser": true when no target is supplied', function() {
    process.env.NODE_ENV = 'production';

    const expected = {
      presets: [
        [require('babel-preset-env'), {
          exclude: [
            'transform-regenerator',
          ],
          modules: false,
        }],
        require('babel-preset-stage-3'),
      ],
      plugins: [],
    };
    expect(preset()).to.deep.equal(expected);
  });

  describe('when process env is "test"', function() {
    it('should add babel-plugin-rewire', function() {
      process.env.NODE_ENV = 'test';

      const expected = {
        presets: [
          [require('babel-preset-env'), {
            exclude: [
              'transform-regenerator',
            ],
            modules: false,
          }],
          require('babel-preset-stage-3'),
        ],
        plugins: [
          require('babel-plugin-rewire'),
        ],
      };
      expect(preset()).to.deep.equal(expected);
    });

    it('should add babel-plugin-istanbul when COVERAGE=1', function() {
      process.env.NODE_ENV = 'test';
      process.env.COVERAGE = '1';

      const expected = {
        presets: [
          [require('babel-preset-env'), {
            exclude: [
              'transform-regenerator',
            ],
            modules: false,
          }],
          require('babel-preset-stage-3'),
        ],
        plugins: [
          require('babel-plugin-istanbul').default,
          require('babel-plugin-rewire'),
        ],
      };
      expect(preset()).to.deep.equal(expected);
    });

    it('should add babel-plugin-rewire in the correct order', function() {
      process.env.NODE_ENV = 'test';
      process.env.COVERAGE = '1';

      const expected = {
        presets: [
          [require('babel-preset-env'), {
            exclude: [
              'transform-regenerator',
            ],
            modules: false,
          }],
          require('babel-preset-stage-3'),
        ],
        plugins: [
          require('babel-plugin-istanbul').default,
          require('babel-plugin-rewire'),
        ],
      };
      expect(preset()).to.deep.equal(expected);
    });
  });

  describe('when "env" has no options', function() {
    it('should add the env preset without options', function() {
      process.env.NODE_ENV = 'production';

      const expected = {
        presets: [
          [require('babel-preset-env'), {
            exclude: [
              'transform-regenerator',
            ],
            modules: false,
          }],
          require('babel-preset-stage-3'),
        ],
        plugins: [],
      };
      expect(preset()).to.deep.equal(expected);
    });
  });

  describe('when "env" has options', function() {
    it('should add the env preset passing down empty options', function() {
      process.env.NODE_ENV = 'production';

      const expected = {
        presets: [
          [require('babel-preset-env'), {
            exclude: [
              'transform-regenerator',
            ],
            modules: false,
          }],
          require('babel-preset-stage-3'),
        ],
        plugins: [],
      };
      expect(preset(null, { env: {} })).to.deep.equal(expected);
    });

    it('should add the env preset passing down exclude option', function() {
      process.env.NODE_ENV = 'production';

      var envOpts = {
        targets: {
          chrome: 55,
        },
        exclude: ['other-exclude'],
      };

      const expected = {
        presets: [
          [require('babel-preset-env'), {
            targets: {
              chrome: 55,
            },
            exclude: [
              'other-exclude',
              'transform-regenerator',
            ],
            modules: false,
          }],
          require('babel-preset-stage-3'),
        ],
        plugins: [],
      };
      expect(preset(null, { env: envOpts })).to.deep.equal(expected);
    });

    it('should add the env preset passing down modules option as undefined', function() {
      process.env.NODE_ENV = 'production';

      var envOpts = {
        targets: {
          chrome: 55,
        },
        exclude: ['other-exclude'],
        modules: undefined,
      };

      const expected = {
        presets: [
          [require('babel-preset-env'), {
            targets: {
              chrome: 55,
            },
            exclude: [
              'other-exclude',
              'transform-regenerator',
            ],
            modules: undefined,
          }],
          require('babel-preset-stage-3'),
        ],
        plugins: [],
      };
      expect(preset(null, { env: envOpts })).to.deep.equal(expected);
    });
  });
});
