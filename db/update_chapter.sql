update chapters
set book_id = $2
, book_chapter = $3
, chapter_title = $4
, chapter_text = $5
, membership_required_chapter = $6
, membership_ids_chapter = $7
where chapter_id = $1
returning *