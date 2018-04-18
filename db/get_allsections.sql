select * from sections
right outer join section_videos on sections.section_id = section_videos.section_id
left outer join videos on videos.video_id = section_videos.video_id
where sections.chapter_id = $1