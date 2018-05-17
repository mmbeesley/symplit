module.exports = {

    getOneSectionVideo: (req,res) => {
        const db = req.app.get('db');
        const {sectionvideoId} = req.params;
        
        db.get_sectionvideo([sectionvideoId]).then(video => {
            res.status(200).send(video);
        })
    },

    createSectionVideo: (req,res) => {
        if(req.user.is_admin){

            const db = req.app.get('db');
            const { section_id, video_id, sectionvideo_title, sectionvideo_text, membership_required_video, membership_ids, sectionvideo_handout } = req.body;
            
            db.create_sectionvideo([ section_id, video_id, sectionvideo_title, sectionvideo_text, membership_required_video, membership_ids, sectionvideo_handout ]).then(newVideo => {
                res.status(200).send(newVideo);
            })
        } else {
            res.status(403).send('Unauthorized');
        }
    },

    updateSectionVideo: (req,res) => {
        if(req.user.is_admin){

            const db = req.app.get('db');
            const { video_id, sectionvideo_title, sectionvideo_text, membership_required_video, membership_ids, sectionvideo_handout } = req.body;
            const {sectionvideoId} = req.params;
            
            if(membership_ids == ''){
                membership_ids = null;
            }
            
            db.update_sectionvideo([ sectionvideoId, video_id, sectionvideo_title, sectionvideo_text, membership_required_video, membership_ids, sectionvideo_handout]).then(updated => {
                res.status(200).send(updated);
            })
        } else {
            res.status(403).send('Unauthorized');
        }
    },

    deleteSectionVideo: (req,res) => {
        if(req.user.is_admin){

            const db = req.app.get('db');
            const {sectionvideoId} = req.params;
            
            db.delete_sectionvideo([sectionvideoId]).then(deleted => {
                res.status(200).send('deleted');
            })
        } else {
            res.status(403).send('Unauthorized');
        }
    }

}