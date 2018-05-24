module.exports = {

    getProblems: (req, res) => {
        const db = req.app.get('db');
        const { bookId } = req.params;
        db.get_booksections([bookId]).then(async sections => {
            var results = [];
            for (var i = 0, obj = {}; i < sections.length; i++) {
                if (sections[i].section_id && sections[i].section_id != obj.sectionId) {
                    obj = {
                        sectionId: sections[i].section_id,
                        sectionNumber: sections[i].section_number,
                        sectionTitle: sections[i].section_title,
                        memRequired: sections[i].membership_required_section,
                        memIds: sections[i].membership_ids_sections,
                        chapter: sections[i].book_chapter,
                        practiceProblems: []
                    }
                    results.push(obj);
                }
                if (sections[i].practice_problems_ids) {
                    let ids = sections[i].practice_problems_ids;
                    for (let x = 0; x < ids.length; x++) {
                        await db.get_problem([ids[x]]).then(problem => {
                            obj.practiceProblems.push(problem[0]);
                        })
                    }
                }
            }
            res.status(200).send(results);
        })
    },

    getSectionProblems: (req, res) => {
        const db = req.app.get('db');


    },

    getOneProblem: (req, res) => {
        const db = req.app.get('db');
        const { problemId } = req.params;

        db.get_problem([problemId]).then(problem => {
            res.status(200).send(problem)
        })
    },

    createProblem: (req, res) => {
        const db = req.app.get('db');
        const { problem_title, problem_image, problem_solution, membership_required } = req.body;

        db.create_problem([problem_title, problem_image, problem_solution, membership_required]).then(newProblem => {
            db.get_allproblems().then(problems => {
                res.status(200).send(problems);
            })
        })
    },

    updateProblem: (req, res) => {
        const db = req.app.get('db');
        const { problem_title, problem_image, problem_solution, membership_required } = req.body;
        const { problemId } = req.params;

        db.update_problem([problemId, problem_title, problem_image, problem_solution, membership_required]).then(updated => {
            db.get_allproblems().then(problems => {
                res.status(200).send(problems);
            })
        })
    },

    deleteProblem: (req, res) => {
        const db = req.app.get('db');
        const { problemId } = req.params;

        db.delete_problem([problemId]).then(deleted => {
            db.get_allproblems().then(problems => {
                res.status(200).send(problems);
            })
        })
    },

    completedProblems: (req, res) => {
        if(req.user) {

            const db = req.app.get('db');
            const { user_id } = req.user;
            
            db.get_completedproblems([user_id]).then(completed => {
                res.status(200).send(completed);
            })
        } else {
            res.status(200).send('no user');
        }
    },

    completeAProblem: (req, res) => {
        const db = req.app.get('db');
        const { user } = req.user.user_id;
        const { problemId } = req.params;

        db.complete_problem([user, problemId]).then(completed => {

        })
    }
}