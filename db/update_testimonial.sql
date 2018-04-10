update user_testimonials
set testimonial_author = $2,
testimonial_text = $3
where testimonial_id = $1