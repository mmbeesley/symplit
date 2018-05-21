select * from user_saved_books
join books on user_saved_books.book_id = books.book_id
where user_id = $1