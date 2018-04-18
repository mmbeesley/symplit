insert into sections
(section_number, section_title, chapter_id, section_text, membership_required_section, membership_ids_section, practice_problems_ids, section_handout)
values
($1,$2,$3,$4,$5,$6,$7,$8)
returning *