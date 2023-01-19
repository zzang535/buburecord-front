const express = require('express')
const router = express.Router()
const tuning = require('../controller/tuning')

router.get('/updateImageUrl', tuning.updateImageUrl)

module.exports = router
