update section_videos
set video_id = $2, section_video_title = $3, section_video_text = $4, membership_required_video = $5, membership_ids = $6, section_video_handout = $7
where section_video_id = $1
returning *