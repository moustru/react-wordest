/* eslint-disable @typescript-eslint/no-var-requires */
module.exports = {
  plugins: [
    require("postcss-nested"),
    require("cssnano")({
      preset: "default",
    }),
    require("autoprefixer"),
  ],
};
