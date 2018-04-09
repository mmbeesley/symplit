module.exports = {

    getOneBook: (req, res) => {
        const db = req.app.get('db');
        const { bookId } = req.params;
        console.log(req.user);

        db.get_book([bookId]).then(book => {
            db.get_allchapters([bookId]).then(chapters => {
                book[0].chapters = chapters
                res.status(200).send(book)
            })
        })
    },

    createBook: (req, res) => {
        const db = req.app.get('db');
        const { book_title, book_subtitle, book_image, book_subject, author, membership_required_book, membership_ids_book, visible } = req.body
        const title = book_title.toUpperCase();
        const subject = book_subject.toUpperCase();

        db.create_book([title, book_subtitle, book_image, subject, author, membership_required_book, membership_ids_book, visible]).then(newBook => {
            res.status(200).send(newBook);
        })
    },

    updateBook: (req, res) => {
        const db = req.app.get('db');
        const { bookId } = req.params
        const { book_title, book_subtitle, book_image, book_subject, author, membership_required_book, membership_ids_book, visible } = req.body
        const title = book_title.toUpperCase();
        const subject = book_subject.toUpperCase();

        db.update_book([bookId, title, book_subtitle, book_image, subject, author, membership_required_book, membership_ids_book, visible]).then(udpatedBook => {
            res.status(200).send(udpatedBook)
        })
    },

    deleteBook: (req, res) => {
        const db = req.app.get('db');
        const { bookId } = req.params;

        db.delete_book([bookId]).then(deleted => { })
    }

}