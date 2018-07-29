select * from sections
join chapters on sections.chapter_id = chapters.chapter_id
join practice_problems
on practice_problems.problem_id = ANY (sections.practice_problems_ids)
where chapters.book_id = $1
ORDER BY sections.section_id asc, practice_problems.problem_id asc