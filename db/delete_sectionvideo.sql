delete from section_videos
where section_video_id = $1
returning $1