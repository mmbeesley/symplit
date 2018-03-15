module.exports = {

    getOneSectionVideo: (req,res) => {
        const db = req.app.get('db');
        const {sectionvideoId} = req.params;
        
        db.get_sectionvideo([sectionvideoId]).then(video => {
            res.status(200).send(video);
        })
    },

    createSectionVideo: (req,res) => {
        const db = req.app.get('db');
        const { section_id, video_id, sectionvideo_title, sectionvideo_text, membership_required_video, membership_ids } = req.body;

        db.create_sectionvideo([ section_id, video_id, sectionvideo_title, sectionvideo_text, membership_required_video, membership_ids ]).then(newVideo => {
            res.status(200).send(newVideo);
        })
    },

    updateSectionVideo: (req,res) => {
        const db = req.app.get('db');
        const { section_id, video_id, sectionvideo_title, sectionvideo_text, membership_required_video, membership_ids } = req.body;
        const {sectionvideoId} = req.params;

        db.update_sectionvideo([ sectionvideoId, section_id, video_id, sectionvideo_title, sectionvideo_text, membership_required_video, membership_ids]).then(updated => {
            res.status(200).send(udpated);
        })
    },

    deleteSectionVideo: (req,res) => {
        const db = req.app.get('db');
        const {sectionvideoId} = req.params;

        db.delete_sectionvideo([sectionvideoId]).then(deleted => {})
    }

}