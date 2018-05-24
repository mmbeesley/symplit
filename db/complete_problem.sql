insert into practice_problems_completed
(user_id, problem_id, section_id)
values
($1, $2, $3)
returning *