delete from user_saved_books
where user_id = $1 and book_id = $2
returning $1