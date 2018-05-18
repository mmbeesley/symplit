select * from sections
full join section_videos on section_videos.section_id = sections.section_id
full join videos on videos.video_id = section_videos.video_id
where sections.chapter_id = $1
order by sections.section_id, section_videos.section_video_id