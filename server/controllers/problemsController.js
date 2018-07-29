module.exports = {
  getProblems: (req, res) => {
    const db = req.app.get("db");
    const { bookId } = req.params;
    db.get_allproblems([bookId]).then(problems => {
      res.status(200).send(problems);
    });
  },

  getSectionProblems: (req, res) => {
    const db = req.app.get("db");
    const { sectionId } = req.params;

    db.get_oneSection([sectionId]).then(async section => {
      let problemArray = [];
      let loopArray = section[0].practice_problems_ids;
      for (let i = 0; i < loopArray.length; i++) {
        let problem_id = loopArray[i];
        await db.get_sectionProblems([problem_id]).then(problem => {
          problemArray.push(problem[0]);
        });
      }
      res.status(200).send(problemArray);
    });
  },

  getSectionCompletedProblems: (req, res) => {
    if (req.user) {
      const db = req.app.get("db");
      const { sectionId } = req.params;
      const { user_id } = req.user;

      db.get_sectionCompletedProblems([sectionId, user_id]).then(problems => {
        res.status(200).send(problems);
      });
    } else {
      res.status(200).send("no user");
    }
  },

  getOneProblem: (req, res) => {
    const db = req.app.get("db");
    const { problemId } = req.params;

    db.get_problem([problemId]).then(problem => {
      res.status(200).send(problem);
    });
  },

  createProblem: (req, res) => {
    if (req.user.is_admin) {
      const db = req.app.get("db");
      const {
        problem_title,
        problem_image,
        problem_solution,
        membership_required,
        membership_ids,
        section_id
      } = req.body;

      db.create_problem([
        problem_title,
        problem_image,
        problem_solution,
        membership_required,
        membership_ids
      ]).then(newProblem => {
        db.get_oneSection([section_id]).then(async section => {
          let problemArray = [];
          let loopArray = section[0].practice_problems_ids;
          for (let i = 0; i < loopArray.length; i++) {
            let problem_id = loopArray[i];
            await db.get_sectionProblems([problem_id]).then(problem => {
              problemArray.push(problem[0]);
            });
          }
          res.status(200).send(problemArray);
        });
      });
    } else {
      res.status(403).send("No admin");
    }
  },

  updateProblem: (req, res) => {
    if (req.user.is_admin) {
      const db = req.app.get("db");
      const {
        problem_title,
        problem_image,
        problem_solution,
        membership_required,
        membership_ids,
        section_id
      } = req.body;
      const { problemId } = req.params;

      db.update_problem([
        problemId,
        problem_title,
        problem_image,
        problem_solution,
        membership_required,
        membership_ids
      ]).then(updated => {
        db.get_oneSection([section_id]).then(async section => {
          let problemArray = [];
          let loopArray = section[0].practice_problems_ids;
          for (let i = 0; i < loopArray.length; i++) {
            let problem_id = loopArray[i];
            await db.get_sectionProblems([problem_id]).then(problem => {
              problemArray.push(problem[0]);
            });
          }
          res.status(200).send(problemArray);
        });
      });
    } else {
      res.status(403).send("No admin");
    }
  },

  deleteProblem: (req, res) => {
    if (req.user.is_admin) {
      const db = req.app.get("db");
      const { problemId, sectionId } = req.params;

      db.delete_problem([problemId]).then(deleted => {
        db.get_oneSection([sectionId]).then(async section => {
          let problemArray = [];
          let loopArray = section[0].practice_problems_ids;
          for (let i = 0; i < loopArray.length; i++) {
            let problem_id = loopArray[i];
            await db.get_sectionProblems([problem_id]).then(problem => {
              problemArray.push(problem[0]);
            });
          }
          res.status(200).send(problemArray);
        });
      });
    } else {
      res.status(403).send("No admin");
    }
  },

  completedProblems: (req, res) => {
    if (req.user) {
      const db = req.app.get("db");
      const { user_id } = req.user;

      db.get_completedproblems([user_id]).then(completed => {
        res.status(200).send(completed);
      });
    } else {
      res.status(200).send("no user");
    }
  },

  completeAProblem: (req, res) => {
    if (req.user) {
      const db = req.app.get("db");
      const { user_id } = req.user;
      const { problemId, sectionId } = req.body;

      db.complete_problem([user_id, problemId, sectionId]).then(completed => {
        db.get_completedproblems([user_id]).then(list => {
          res.status(200).send(list);
        });
      });
    } else {
      res.status(200).send("no user");
    }
  },

  undoCompleteAProblem: (req, res) => {
    const db = req.app.get("db");
    const { user_id } = req.user;
    const { problemId, sectionId } = req.params;

    db.unComplete_problem([user_id, problemId, sectionId]).then(deleted => {
      db.get_completedproblems([user_id]).then(list => {
        res.status(200).send(list);
      });
    });
  }
};
