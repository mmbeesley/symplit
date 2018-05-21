insert into user_saved_books
(user_id, book_id)
values
($1,$2)
returning *