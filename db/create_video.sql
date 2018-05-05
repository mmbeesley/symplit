insert into videos
(video_title, video_url)
values
($1,$2)
returning *