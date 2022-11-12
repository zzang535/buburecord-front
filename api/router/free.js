const express = require('express')
const router = express.Router()
const free = require('../controller/free')

const multer = require('multer') // 파일 처리 모듈
const multerS3 = require('multer-s3') // multer - AWS S3 연결 모듈
const AWS = require('aws-sdk') // AWS 모듈


// AWS id, access key 설정
AWS.config.update({
    accessKeyId: 'AKIAXDPSAAI3I325CJ5G',
    secretAccessKey: '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',
    region: 'ap-northeast-2'
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

router.get('/list', free.list)
router.get('/item/:id', free.item)
router.post('/upload_file', upload.single('file'), free.upload_file)

module.exports = router
