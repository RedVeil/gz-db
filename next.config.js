const { join } = require("path");
require("./lib/utils/env/envLoader");

const workspace = join(__dirname, "..");

module.exports = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {},
};
