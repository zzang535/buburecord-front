// 모델
const Feed = require('../../models').feed // feed 로드

export async function list(req, res) {
    try {
        const find_feed = await Feed.findAll({ 
            order: [['created_at', 'DESC']]
        })
        const data = find_feed
        res.status(200).send({ message: '앨범 리스트 조회 성공', data })
        return
    } catch (err) {
        console.log(err)
        res.status(500).send({ message: '앨범 리스트 조회 실패' })
    }
}


export async function item(req, res) {
    const { id } = req.params
    try {
        const find_feed = await Feed.findByPk(id)
        const data = find_feed
        res.status(200).send({ message: '앨범 하나 조회 성공', data })
        return
    } catch (err) {
        console.log(err)
        res.status(500).send({ message: '앨범 하나 조회 실패' })
        return
    }
}