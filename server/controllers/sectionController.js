module.exports = {

    getOneSection: (req, res) => {
        const db = req.app.get('db');
        const { sectionId, chapterId } = req.params;

        db.get_section([sectionId, chapterId]).then(section => {
            res.status(200).send(section)
        })
    },

    createSection: (req, res) => {
        if (req.user.is_admin) {

            const db = req.app.get('db');
            const { section_number, section_title, chapter_id, section_text, membership_required_section, membership_ids, problem_ids, section_handout } = req.body;

            if (membership_ids == '') {
                membership_ids = null;
            }

            db.create_section([section_number, section_title, chapter_id, section_text, membership_required_section, membership_ids, problem_ids, section_handout]).then(newSection => {
                res.status(200).send(newSection);
            })
        } else {
            res.status(403).send('Unauthorized');
        }
    },

    updateSection: (req, res) => {
        if(req.user.is_admin){

            const db = req.app.get('db');
            const { section_number, section_title, chapter_id, section_text, membership_required_section, membership_ids, problem_ids, section_handout } = req.body;
            const { sectionId } = req.params
            
            if (membership_ids == '') {
                membership_ids = null;
            }
            
            db.update_section([sectionId, section_number, section_title, chapter_id, section_text, membership_required_section, membership_ids, problem_ids, section_handout]).then(updatedSection => {
                res.status(200).send(updatedSection)
            })
        } else {
            res.status.send('Unauthorized');
        }
    },

    deleteSection: (req, res) => {
        if(req.user.is_admin){

            const db = req.app.get('db');
            const { sectionId, chapterId } = req.params;
            
            db.delete_section([sectionId, chapterId]).then(deleted => {
                res.status(200).send('Deleted');
            })
        } else {
            res.status(403).send('Unauthorized');
        }
    }

}