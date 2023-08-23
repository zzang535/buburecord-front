const express = require('express')
const router = express.Router()
const history = require('../controller/history')

router.get('/list', history.list)

module.exports = router
