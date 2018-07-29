module.exports = {
  getTestimonials: (req, res) => {
    const db = req.app.get("db");

    db.get_alltestimonials().then(testimonials => {
      res.status(200).send(testimonials);
    });
  },

  getOneTestimonial: (req, res) => {
    const db = req.app.get("db");
    const { testimonialId } = req.params;
    db.get_testimonial([testimonialId]).then(testimonial => {
      res.status(200).send(testimonial);
    });
  },

  createTestimonial: (req, res) => {
    const db = req.app.get("db");
    const { testimonial_author, testimonial_text } = req.body;
    if (req.user.is_admin) {
      db.create_testimonial([testimonial_author, testimonial_text]).then(
        newTestimonial => {
          db.get_alltestimonials().then(testimonials => {
            res.status(200).send(testimonials);
          });
        }
      );
    } else {
      res.status(403).send("User not admin");
    }
  },

  updateTestimonial: (req, res) => {
    const db = req.app.get("db");
    const { testimonial_author, testimonial_text } = req.body;
    const { testimonialId } = req.params;

    if (req.user.is_admin) {
      db.update_testimonial([
        testimonialId,
        testimonial_author,
        testimonial_text
      ]).then(updated => {
        db.get_alltestimonials().then(testimonials => {
          res.status(200).send(testimonials);
        });
      });
    } else {
      res.status(403).send("User not admin");
    }
  },

  deleteTestimonial: (req, res) => {
    const db = req.app.get("db");
    const { testimonialId } = req.params;

    if (req.user.is_admin) {
      db.delete_testimonial([testimonialId]).then(deleted => {
        db.get_alltestimonials().then(testimonials => {
          res.status(200).send(testimonials);
        });
      });
    } else {
      res.status(403).send("User not admin");
    }
  }
};
