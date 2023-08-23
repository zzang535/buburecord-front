const express = require('express')
const router = express.Router()
const open = require('../controller/open')

const multer = require('multer') // 파일 처리 모듈
const multerS3 = require('multer-s3') // multer - AWS S3 연결 모듈
const AWS = require('aws-sdk') // AWS 모듈


// AWS id, access key 설정
AWS.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: process.env.S3_REGION
})

// S3로 파일을 업로드 하기위한 설정
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


router.get('/item/:id', open.item)
router.post('/upload_file', upload.single('file'), open.upload_file)
router.post('/login', open.login)
router.post('/join', open.join)
router.get('/logout', open.logout)
router.get('/test', open.test)

module.exports = router
