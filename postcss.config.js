const postcssPresetEnv = require(`postcss-preset-env`);
const postcssSimpleVars = require(`postcss-simple-vars`);
const postcssFlexbugFixes = require('postcss-flexbugs-fixes');
const colors = require('./src/utils/colors');

module.exports = () => ({
  plugins: [
    postcssPresetEnv({
      stage: 0,
      // insertBefore: {
      //   'all-property': postcssSimpleVars,
      // },
    }),
    postcssFlexbugFixes(),
    postcssSimpleVars({
      variables: colors,
    }),
  ],
});
