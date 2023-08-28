const express = require('express')
const router = express.Router()
const note = require('../controller/note')

router.get('/list', note.list)
router.post('/create', note.create)

module.exports = router
