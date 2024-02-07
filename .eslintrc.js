module.exports = {
  parser: "@babel/eslint-parser",
  parserOptions: {
    requireConfigFile: false,
    babelOptions: {
      parserOpts: {
        plugins: ["jsx"]
      },
      babelrc: false,
      configFile: false,
      // your babel options
      presets: ["@babel/preset-env"],
    },
  },
};
