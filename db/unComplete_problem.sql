delete from practice_problems_completed
where user_id = $1 and problem_id = $2 and section_id = $3
returning $1