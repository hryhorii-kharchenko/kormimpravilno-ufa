const postcssPresetEnv = require(`postcss-preset-env`);
const postcssSimpleVars = require(`postcss-simple-vars`);
const postcssFlexbugFixes = require('postcss-flexbugs-fixes');

module.exports = () => ({
  plugins: [
    postcssPresetEnv({
      stage: 0,
      insertBefore: {
        'all-property': postcssSimpleVars,
      },
    }),
    postcssFlexbugFixes(),
  ],
});
