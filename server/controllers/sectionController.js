module.exports = {

    getOneSection: (req,res) => {
        const db = req.app.get('db');
        const {sectionId} = req.params;

        db.get_section([sectionId]).then(section => {
            res.status(200).send(section)
        })
    },

    createSection: (req,res) => {
        const db = req.app.get('db');
        const { section_number, section_title, chapter_id, section_text, membership_required_section, membership_ids, problem_ids, section_handout } = req.body;

        db.create_section([section_number, section_title, chapter_id, section_text, membership_required_section, membership_ids, problem_ids, section_handout]).then(newSection => {
            res.status(200).send(newSection);
        })
    },

    updateSection: (req,res) => {
        const db = req.app.get('db');
        const { section_number, section_title, chapter_id, section_text, membership_required_section, membership_ids, problem_ids, section_handout } = req.body;
        const { sectionId } = req.params

        db.update_section([sectionId, section_number, section_title, chapter_id, section_text, membership_required_section, membership_ids, problem_ids, section_handout]).then(updatedSection => {
            res.status(200).send(updatedSection)
        })
    },

    deleteSection: (req,res) => {
        const db = req.app.get('db');
        const { sectionId } = req.params;

        db.delete_section([ sectionId ]).then(deleted => {})
    }

}