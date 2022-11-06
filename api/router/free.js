const express = require('express')
const router = express.Router()
const free = require('../controller/free')

router.get('/list', free.list)
router.get('/item/:id', free.item)

module.exports = router
