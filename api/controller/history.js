const History = require('../../models').history

export async function list(req, res) {

    console.log('call list api')
    const { id } = req.token
    console.log(id)

    try {
        const find_feed = await History.findAll({ 
            where: { user_id: id },
            order: [['date', 'DESC']]
        })
        const data = find_feed
        res.status(200).send({ message: 'get history success', data })
        return
    } catch (err) {
        console.log(err)
        res.status(500).send({ message: 'get history fail' })
    }
}
