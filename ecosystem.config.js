require("dotenv").config();

module.exports = {
  apps: [
    {
      name: `buburecord-front-${process.env.APP_ENVIRONMENT}`,
      exec_mode: "cluster",
      instances: "max", // Or a number of instances
      script: "./node_modules/nuxt/bin/nuxt.js",
      args: "start",
    },
  ],
};
