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
        const {video_title, video_url, video_problem, video_thumbnail} = req.body;

        db.create_video([video_title, video_url, video_problem, video_thumbnail]).then(newVideo => {
            res.status(200).send(newVideo);
        })
    },

    updateVideo: (req,res) => {
        const db = req.app.get('db');
        const {video_title, video_url, video_problem, video_thumbnail} = req.body;
        const { videoId } = req.params;

        db.update_video([ videoId, video_title, video_url, video_problem, video_thumbnail ]).then(update => {
            res.status(200).send(update)
        })
    },

    deleteVideo: (req,res) => {
        const db = req.app.get('db');
        const { videoId } = req.params;

        db.delete_video([ videoId ]).then(deleted => {})
    }

}