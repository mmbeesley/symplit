module.exports = {

    getProblems: (req,res) => {
        const db = req.app.get('db');

        db.get_allproblems().then(problems => {
            res.status(200).send(problems)
        })
    },
    
    getOneProblem: (req,res) => {
        const db = req.app.get('db');
        const {problemId} = req.params;

        db.get_problem([problemId]).then(problem => {
            res.status(200).send(problem)
        })
    },

    createProblem: (req,res) => {
        const db = req.app.get('db');
        const {problem_title, problem_image, problem_solution, membership_required} = req.body;
        
        db.create_problem([problem_title, problem_image, problem_solution, membership_required]).then(newProblem => {
            res.status(200).send(newProblem);
        })
    },

    updateProblem: (req,res) => {
        const db = req.app.get('db');
        const {problem_title, problem_image, problem_solution, membership_required} = req.body;
        const {problemId} = req.params;

        db.update_problem([problemId, problem_title, problem_image, problem_solution, membership_required]).then(updated => {
            res.status(200).send(updated);
        })
    },

    deleteProblem: (req,res) => {
        const db = req.app.get('db');
        const {problemId} = req.params;

        db.delete_problem([problemId]).then(deleted => {})
    },

    completedProblems: (req,res) => {
        
    }
}