require('dotenv').config()

module.exports = {
    apps: [
      {
        name: `${process.env.APP_ENVIRONMENT}.seoteacher`,
        exec_mode: 'cluster',
        instances: 'max', // Or a number of instances
        script: './node_modules/nuxt/bin/nuxt.js',
        args: 'start'
      }
    ]
  }