select * from section_videos
join videos on section_videos.video_id = videos.video_id
where section_videos.section_id = $1