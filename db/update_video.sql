update videos
set video_title = $2, video_url = $3
where video_id = $1
returning *