const Feed = require('../../models').feed

export async function updateImageUrl(req, res) {
    console.log('call update image url')
    try {
        const findFeed = await Feed.findAll({
            raw: true
        })
        console.log(findFeed)
        const updatedFeeds = findFeed.map(feed => {
            return {
                ...feed,
                image_url: feed.image_url.replace('https://bird-s3.s3.ap-northeast-2.amazonaws.com/', '')
            }
        })

        console.log(updatedFeeds)
        // for await (let feed of updatedFeeds) {
        //     await Feed.update({
        //         image_url: feed.image_url
        //     }, {
        //         where: {
        //             id: feed.id
        //         }
        //     })
        // }
       
        res.send('ok')
    } catch (err) {
        console.log(err)
    }
}