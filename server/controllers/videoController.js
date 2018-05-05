module.exports = {

    getVideos: (req,res) => {
        const db = req.app.get('db');

        db.get_allvideos().then(videos => {
            res.status(200).send(videos);
        })
    },

    getOneVideo: (req,res) => {
        const db = req.app.get('db');
        const {videoId} = req.params

        db.get_video([videoId]).then(video => {
            res.status(200).send(video)
        })
    },

    createVideo: (req,res) => {
        const db = req.app.get('db');
        const {video_title, video_url} = req.body;

        db.create_video([video_title, video_url]).then(newVideo => {
            res.status(200).send(newVideo);
        })
    },

    updateVideo: (req,res) => {
        const db = req.app.get('db');
        const {video_title, video_url} = req.body;
        const { videoId } = req.params;

        console.log('hit the endpoint', video_title, video_url);

        db.update_video([ videoId, video_title, video_url ]).then(update => {
            console.log(update);
            res.status(200).send(update)
        })
    },

    deleteVideo: (req,res) => {
        const db = req.app.get('db');
        const { videoId } = req.params;
        console.log('hit the endpoint', videoId);
        db.delete_video([ videoId ]).then(deleted => {
            res.status(200).send('deleted');
        })
    }

}