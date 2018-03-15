module.exports = {

    getBooks: (req,res) => {
        const db = req.app.get('db');

        db.get_allbooks().then(books => {
            res.status(200).send(books);
        })
    },

    searchBooks: (req,res) => {
        const db = req.app.get('db');
        const search = '%' + req.query.book.toUpperCase() + '%'

        db.get_searchbooks([search]).then(books => {
            res.status(200).send(books);
        })
    },

    getChapters: (req, res) => {
        const db = req.app.get('db');
        const { bookId } = req.params;
        
        db.get_allchapters([bookId]).then(chapters => {
            res.status(200).send(chapters);
        })
    },

    getSections: (req, res) => {
        const db = req.app.get('db');
        const { chapterId } = req.params;

        db.get_allsections([chapterId]).then(sections => {
            res.status(200).send(sections);
        })
    },

    getSectionVideos: (req, res) => {
        const db = req.app.get('db');
        const { sectionId } = req.params;

        db.get_allsectionvideos([sectionId]).then(videos => {
            res.status(200).send(videos);
        })
    }

}