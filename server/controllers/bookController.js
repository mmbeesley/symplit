module.exports = {

    getOneBook: (req, res) => {
        const db = req.app.get('db');
        const { bookId } = req.params;

        db.get_book([bookId]).then(book => {
            db.get_allchapters([bookId]).then(chapters => {
                book[0].chapters = chapters
                res.status(200).send(book)
            })
        })
    },

    createBook: (req, res) => {
        if(req.user.is_admin){

            const db = req.app.get('db');
            const { book_title, book_subtitle, book_image, book_subject, author, membership_required_book, membership_ids_book, visible } = req.body
            const title = book_title.toUpperCase();
            const subject = book_subject.toUpperCase();
            const authorFormat = `{${author}}`;
            const idsFormat = `{${membership_ids_book}}`;
            
            db.create_book([title, book_subtitle, book_image, subject, authorFormat, membership_required_book, idsFormat, visible]).then(newBook => {
                res.status(200).send(newBook);
            })
        } else {
            res.status(403).send('Unauthorized');
        }
    },

    updateBook: (req, res) => {
        if(req.user.is_admin){

            const db = req.app.get('db');
            const { bookId } = req.params
            const { book_title, book_subtitle, book_image, book_subject, author, membership_required_book, membership_ids_book, visible } = req.body
            const title = book_title.toUpperCase();
            const subject = book_subject.toUpperCase();
            const authorFormat = `{${author}}`
            const idsFormat = `{${membership_ids_book}}`
            
            db.update_book([bookId, title, book_subtitle, book_image, subject, authorFormat, membership_required_book, idsFormat, visible]).then(udpatedBook => {
                res.status(200).send(udpatedBook)
            })
        } else {
            res.status(403).send('Unauthorized');
        }
    },

    deleteBook: (req, res) => {
        if(req.user.is_admin){

            const db = req.app.get('db');
            const { bookId } = req.params;
            
            db.delete_book([bookId]).then(deleted => {
                res.status(200).send('Book deleted successfully')
            })
        } else {
            res.status(403).send('Unauthorized')
        }
    }

}