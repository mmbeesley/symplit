module.exports = {

    getOneSectionVideo: (req,res) => {
        const db = req.app.get('db');
        const {sectionvideoId} = req.params;
        console.log(sectionvideoId, typeof sectionvideoId, 'param');
        
        db.get_sectionvideo([sectionvideoId]).then(video => {
            console.log(video);
            res.status(200).send(video);
        })
    },

    createSectionVideo: (req,res) => {
        const db = req.app.get('db');
        const { section_id, video_id, sectionvideo_title, sectionvideo_text, membership_required_video, membership_ids, sectionvideo_handout } = req.body;

        db.create_sectionvideo([ section_id, video_id, sectionvideo_title, sectionvideo_text, membership_required_video, membership_ids, sectionvideo_handout ]).then(newVideo => {
            res.status(200).send(newVideo);
        })
    },

    updateSectionVideo: (req,res) => {
        const db = req.app.get('db');
        const { video_id, sectionvideo_title, sectionvideo_text, membership_required_video, membership_ids, sectionvideo_handout } = req.body;
        const {sectionvideoId} = req.params;

        db.update_sectionvideo([ sectionvideoId, video_id, sectionvideo_title, sectionvideo_text, membership_required_video, membership_ids, sectionvideo_handout]).then(updated => {
            res.status(200).send(updated);
        })
    },

    deleteSectionVideo: (req,res) => {
        const db = req.app.get('db');
        const {sectionvideoId} = req.params;

        db.delete_sectionvideo([sectionvideoId]).then(deleted => {
            res.status(200).send('deleted');
        })
    }

}