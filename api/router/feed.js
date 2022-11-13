const express = require('express')
const router = express.Router()
const feed = require('../controller/feed')

router.get('/list', feed.list)

module.exports = router
