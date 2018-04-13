update books
set book_title = $2
, book_subtitle = $3
, book_image = $4
, book_subject = $5
, author = $6
, membership_required_book = $7
, membership_ids_book = $8
, visible = $9
where book_id = $1
returning *