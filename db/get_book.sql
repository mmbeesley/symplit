select * from books
-- join chapters on books.book_id = chapters.book_id
-- join sections on chapters.chapter_id = sections.chapter_id
-- join section_videos on sections.section_id = section_videos.section_id
-- join videos on section_videos.video_id = videos.video_id
where books.book_id = $1