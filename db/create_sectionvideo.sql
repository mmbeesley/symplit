insert into section_videos
(section_id, video_id, section_video_title, section_video_text, membership_required_video, membership_ids, section_video_handout)
values
($1,$2,$3,$4,$5,$6,$7)
returning *