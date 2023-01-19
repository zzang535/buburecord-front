const multer = require('multer') 
const multerS3 = require('multer-s3') 
const AWS = require('aws-sdk') 

const express = require('express')
const router = express.Router()
const feed = require('../controller/feed')

AWS.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: process.env.S3_REGION
})

const upload = multer({
    storage: multerS3({
        s3: new AWS.S3(),
        bucket: 'bird-s3',
        acl: 'public-read', // 파일 업로드시 권한 설정
        key(req, file, cb) {
            cb(null, `images/${Date.now()}_${file.originalname}`)
        }
    })
})

router.get('/list', feed.list)
router.post('/create', upload.single('image'), feed.create)

module.exports = router
