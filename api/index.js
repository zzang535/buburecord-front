const express = require('express')
const cors = require('cors')
const app = express()
const { sequelize } = require('../models')


// SEQUELIZE 연결 체크
sequelize.authenticate()
.then(() => console.log('Connection has been established successfully.'))
.catch(err => console.error('Unable to connect to the database: ', err))

// { force: true }
// { alter : true }
sequelize.sync()
.then(() => { console.log('DB SYNC SUCCESS') })
.catch(err => console.log('DB SYNC FAIL: ', err))


app.use(cors())

app.use(express.urlencoded({
  limit: '300mb',
  parameterLimit: 100000,
  extended: true
}))

app.use(express.json({ // json parser
  limit: '300mb'
}))

app.all('/*', function (req, res, next) {
  res.header('Access-Control-Allow-Ogigin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  next()
})

app.use('/free', require('./router/free.js'))
app.use(require("./middleware/token.js").token)
app.use('/feed', require('./router/feed.js')) 


module.exports = {
  path: '/api',
  handler: app
}
