select * from sections
full join chapters on chapters.chapter_id = sections.chapter_id
where chapters.book_id = $1
order by sections.section_id