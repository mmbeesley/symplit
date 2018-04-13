insert into books
(book_title, book_subtitle, book_image, book_subject, author, membership_required_book, membership_ids_book, visible)
values
($1,$2,$3,$4,$5,$6,$7,$8)
returning *