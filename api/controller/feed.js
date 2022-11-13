// 모델
const sequelize = require("../../models").sequelize
const Feed = require('../../models').feed 

export async function list(req, res) {

    console.log('call list api')
    const { id } = req.token
    console.log(id)

    try {
        const find_feed = await Feed.findAll({ 
            where: { user_id: id },
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