const Note = require('../../models').note

export async function list(req, res) {
    const { id } = req.token
    console.log(id)
    try {
        const result = await Note.findAll({ 
            where: { user_id: id },
            order: [['date', 'DESC']]
        })
        const data = result
        res.status(200).send({ message: 'get note list success', data })
        return
    } catch (err) {
        console.log(err)
        res.status(500).send({ message: 'get note list fail' })
    }
}


export async function create(req, res) {
    const { id } = req.token
    const { date, titleKR, titleJP, contentKR, contentJP } = req.body
    console.log(req.body)
    console.log(id)
    try {
        const createData = {
            date: date,
            title_korean: titleKR,
            title_japanese: titleJP,
            content_korean: contentKR,
            content_japanese: contentJP,
            user_id: id,
        }
        await Note.create(createData)
        return res.status(200).send({ message: 'create note success'})
    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: 'create note fail' })
    }
}
