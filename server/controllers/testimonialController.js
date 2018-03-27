module.exports = {
    getTestimonials: (req,res) => {
        const db = req.app.get('db');

        db.get_alltestimonials().then(testimonials => {
            res.status(200).send(testimonials);
        })
    },

    getOneTestimonial: (req,res) => {
        const db = req.app.get('db');
        const {testimonialId} = req.params;

        db.get_testimonial([testimonialId]).then(testimonial => {
            res.status(200).send(testimonial)
        })
    },

    createTestimonial: (req,res) => {
        const db = req.app.get('db');
        const {testimonial_giver, testimonial_text} = req.body;
        
        db.create_testimonial([testimonial_giver, testimonial_text]).then(newTestimonial => {
            res.status(200).send(newTestimonial);
        })
    },

    updateTestimonial: (req,res) => {
        const db = req.app.get('db');
        const {testimonial_giver, testimonial_text} = req.body;
        const {testimonialId} = req.params;

        db.update_testimonial([testimonialId, testimonial_giver, testimonial_text]).then(updated => {
            res.status(200).send(updated);
        })
    },

    deleteTestimonial: (req,res) => {
        const db = req.app.get('db');
        const {testimonialId} = req.params;

        db.delete_testimonial([testimonialId]).then(deleted => {})
    }
    
}