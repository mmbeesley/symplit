module.exports = {

    getOneChapter: (req,res) => {
        const db = req.app.get('db');
        const {chapterId} = req.params;

        db.get_chapter([chapterId]).then(chapter => {
            res.status(200).send(chapter)
        })
    },

    createChapter: (req,res) => {
        const db = req.app.get('db');
        const { book_id, book_chapter, chapter_title, chapter_text, membership_required_chapter, membership_ids_chapter } = req.body;

        db.create_chapter([book_id, book_chapter, chapter_title, chapter_text, membership_required_chapter, membership_ids_chapter]).then(newChapter => {
            res.status(200).send(newChapter);
        })
    },

    updateChapter: (req,res) => {
        const db = req.app.get('db');
        const { book_id, book_chapter, chapter_title, chapter_text, membership_required_chapter, membership_ids_chapter } = req.body;
        const { chapterId } = req.params

        db.update_chapter([chapterId, book_id, book_chapter, chapter_title, chapter_text, membership_required_chapter, membership_ids_chapter]).then(updatedChapter => {
            res.status(200).send(updatedChapter)
        })
    },

    deleteChapter: (req,res) => {
        const db = req.app.get('db');
        const { chapterId } = req.params;

        db.delete_chapter([ chapterId ]).then(deleted => {
            res.status(200).send('Deleted!')
        })
    }

}