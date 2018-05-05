delete from videos
where video_id = $1
returning $1