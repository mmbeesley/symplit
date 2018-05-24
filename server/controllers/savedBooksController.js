module.exports = {

    getBooks: (req, res) => {
        const db = req.app.get('db');
        if (req.user) {

            const user = req.user.user_id;

            db.get_savedbooks([user]).then(books => {
                res.status(200).send(books);
            })
        } else {
            res.status(200).send('no user');
        }
    },

    addBook: (req, res) => {
        const db = req.app.get('db');
        const user = req.user.user_id;
        const book = req.body.book_id;

        db.add_savedbooks([user, book]).then(book => {
            db.get_savedbooks([user]).then(books => {
                res.status(200).send(books);
            })
        })
    },

    removeBook: (req, res) => {
        const db = req.app.get('db');
        const user = req.user.user_id;
        const book = req.params.bookId;

        db.remove_savedbooks([user, book]).then(deleted => {
            db.get_savedbooks([user]).then(books => {
                res.status(200).send(books);
            })
        })
    }

}