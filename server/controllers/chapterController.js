module.exports = {

    getOneChapter: (req,res) => {
        const db = req.app.get('db');
        const {chapterId} = req.params;

        db.get_chapter([chapterId]).then(chapter => {
            res.status(200).send(chapter)
        })
    },

    createChapter: (req,res) => {
        if(req.user.is_admin){

            const db = req.app.get('db');
            const { book_id, book_chapter, chapter_title, chapter_text, membership_required_chapter, membership_ids_chapter } = req.body;
            
            if(membership_ids == ''){
                membership_ids = null;
            }
            
            db.create_chapter([book_id, book_chapter, chapter_title, chapter_text, membership_required_chapter, membership_ids_chapter]).then(newChapter => {
                res.status(200).send(newChapter);
            })
        } else {
            res.status(403).send('Unauthorized');
        }
    },

    updateChapter: (req,res) => {
        if(req.user.is_admin){

            const db = req.app.get('db');
            const { book_id, book_chapter, chapter_title, chapter_text, membership_required_chapter, membership_ids_chapter } = req.body;
            const { chapterId } = req.params
            
            if(membership_ids == ''){
                membership_ids = null;
            }
            
            db.update_chapter([chapterId, book_id, book_chapter, chapter_title, chapter_text, membership_required_chapter, membership_ids_chapter]).then(updatedChapter => {
                res.status(200).send(updatedChapter)
            })
        } else {
            res.status(403).send('Unauthorized');
        }
    },

    deleteChapter: (req,res) => {
        if(req.user.is_admin){

            const db = req.app.get('db');
            const { chapterId } = req.params;
            
            db.delete_chapter([ chapterId ]).then(deleted => {
                res.status(200).send('Deleted!')
            })
        } else {
            res.status(403).send('Unauthorized');
        }
    }

}