update sections
set section_number = $2
, section_title = $3
, chapter_id = $4
, section_text = $5
, membership_required_section = $6
, membership_ids_section = $7
, practice_problems_ids = $8
, section_handout = $9
where section_id = $1
returning *