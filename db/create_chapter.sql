insert into chapters
(book_id, book_chapter, chapter_title, chapter_text, membership_required_chapter, membership_ids_chapter)
values
($1,$2,$3,$4,$5,$6)
returning *