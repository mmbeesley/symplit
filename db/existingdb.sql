insert into books
(book_title, book_subtitle, book_image, book_subject, author, membership_required_book, visible)
values 
('STEWART CALCULUS', 'VOLUME ONE', 'stewartcalc1.png', 'CALCULUS', '{"JAMES STEWART"}', FALSE, TRUE),
('STEWART CALCULUS', 'VOLUME TWO', 'stewartcalc2.png', 'CALCULUS', '{"JAMES STEWART"}', FALSE, TRUE),
('BYU MATH 116', NULL, 'Math116.png', 'BUSINESS', '{"STEPHEN BURTON", "VINH DANG", "SKYLER SIMMONS"}', FALSE, TRUE)

insert into chapters
(book_id, book_chapter, chapter_title, chapter_text, membership_required_chapter)
values
(1, 1, 'FUNCTIONS & MODELS', 'SAMPLE TEXT. SECOND SAMPLE TEXT SENTENCE', FALSE),
(1, 2, 'LIMITS & DERIVATIVES', 'LIMITS ARE SORT OF COOL I GUESS', FALSE),
(1, 3, 'DIFFERENTIATION RULES', 'BEING DIFFERENT IS NORMAL CHILDREN', FALSE),
(1, 4, 'APPLICATION OF DIFFERENTIATION', 'STUFF. STUFF', FALSE),
(1, 5, 'INTEGRALS', 'INTEGRALS ARE INTEGRAL TO KNOWING MORE MATH STUFF', FALSE),
(2, 6, 'APPLICATIONS OF INTEGRATION', 'YEP', FALSE),
(2, 7, 'TECHNIQUES OF INTEGRATION', 'THIS STUFF DOES NOT MATTER', FALSE),
(2, 8, 'FURTHER APPLICATIONS OF INTEGRATION', 'BORED', FALSE),
(2, 9, 'DIFFERENTIAL EQUATIONS', NULL, TRUE),
(2, 10, 'PARAMETRIC EQUATION AND POLAR COORDINATES', 'I FEEL LIKE THIS STUFF IS JUST MADE UP', TRUE),
(2, 11, 'INFINITE SEQUENCES AND SERIES', 'YEP', TRUE),
(3, 1, 'REVIEW OF ALGEBRA', 'NOW WE ARE TALKING', FALSE),
(3, 2, 'LIMITS', 'UNLIMITED LIMITS', FALSE),
(3, 3, 'DERIVATIVES', 'BOOOOOOO', FALSE),
(3, 4, 'PRODUCT, QUOTIENT, AND C', 'JUST DONT KNOW WHAT C IS ON THIS ONE', FALSE),
(3, 5, 'COMBINING DERIVATIVE RULES', 'OPTIMIZATION IS NEXT', FALSE),
(3, 6, 'OPTIMIZATION', 'ALL OPTIMIZED NOW', FALSE),
(3, 7, 'SECOND DERIVATIVES', 'WHY ARE THEIR TWO OF THEM?', FALSE),
(3, 8, 'APPLICATIONS TO ECONOMICS', 'FINALLY BUSINESS STUFF', FALSE),
(3, 9, 'L HOSPITALS RULE', 'IS THAT THE NAME OF A MAN?', FALSE),
(3, 10, 'NEWTONS METHOD', 'NEWTON GOT HIT IN THE HEAD AND DISCOVERED SOMETHING. I GOT HIT IN THE HEAD AND GOT KNOCKED OUT.', FALSE)

insert into sections
(section_number, section_title, chapter_id, section_text, membership_required_section, section_handout)
values
(1, 'FOUR WAYS TO REPRESENT A FUNCTION', 1, 'SOME RANDOM TEXT', FALSE, 'STEWART CALCULUS VOLUME ONE/1.1.pdf'),
(2, 'MATHEMATICAL MODELS: A CATALOG OF ESSENTIAL FUNCTIONS', 1, 'SOME RANDOM TEXT', FALSE, 'STEWART CALCULUS VOLUME ONE/1.2.pdf'),
(3, 'NEW FUNCTIONS FROM OLD FUNCTIONS', 1, 'SOME RANDOM TEXT', FALSE, 'STEWART CALCULUS VOLUME ONE/1.3.pdf'),
(4, 'EXPONENTIAL FUNCTIONS', 1, 'SOME RANDOM TEXT', FALSE, 'STEWART CALCULUS VOLUME ONE/1.4.pdf'),
(5, 'INVERSE FUNCTIONS AND LOGARITHMS', 1, 'SOME RANDOM TEXT', FALSE, 'STEWART CALCULUS VOLUME ONE/1.5.pdf'),
(1, 'THE TANGENT AND VELOCITY PROBLEMS', 2, 'SOME RANDOM TEXT', FALSE, 'STEWART CALCULUS VOLUME ONE/2.1.pdf'),
(2, 'THE LIMIT OF A FUNCTION', 2, 'SOME RANDOM TEXT', FALSE, 'STEWART CALCULUS VOLUME ONE/2.2.pdf'),
(3, 'CALCULATING LIMITS USING THE LIMIT LAWS', 2, 'SOME RANDOM TEXT', FALSE, 'STEWART CALCULUS VOLUME ONE/2.3.pdf'),
(4, 'THE PRECISE DEFINITION OF A LIMIT', 2, 'SOME RANDOM TEXT', FALSE, 'STEWART CALCULUS VOLUME ONE/2.4.pdf'),
(5, 'CONTINUITY', 2, 'SOME RANDOM TEXT', FALSE, 'STEWART CALCULUS VOLUME ONE/2.5.pdf'),
(6, 'LIMITS AT INFINITY: HORIZONTAL ASYMPTOTES', 2, 'SOME RANDOM TEXT', FALSE, 'STEWART CALCULUS VOLUME ONE/2.6.pdf'),
(7, 'DERIVATIVES AND RATES OF CHANGE', 2, 'SOME RANDOM TEXT', FALSE, 'STEWART CALCULUS VOLUME ONE/2.7.pdf'),
(8, 'THE DERIVATIVE AS A FUNCTION', 2, 'SOME RANDOM TEXT', FALSE, 'STEWART CALCULUS VOLUME ONE/2.8.pdf')

insert into section_videos
(section_id, video_id, section_video_title, section_video_text, membership_required_video, section_video_handout)
values
(1, 1, 'LECTURE VIDEO: FUNCTIONS', NULL, FALSE, NULL),
(1, 2, 'LECTURE VIDEO: DOMAIN AND RANGE', NULL, FALSE, NULL),
(1, 3, 'LECTURE VIDEO: THE VERTICAL LINE TEST', NULL, FALSE, NULL),
(1, 4, 'LECTURE VIDEO: PIECEWISE FUNCTIONS', NULL, FALSE, NULL),
(1, 5, 'LECTURE VIDEO: SYMMETRY OF FUNCTIONS', NULL, FALSE, NULL),
(1, 6, 'LECTURE VIDEO: INCREASING AND DECREASING', NULL, FALSE, NULL),
(1, 7, 'SECTION 1.1 EXAMPLE 1', 'FUNCTION NOTATION, DOMAIN & RANGE, INCREASING & DECREASING', FALSE, 'thedomainofafunction.pdf'),
(1, 8, 'SECTION 1.1 EXAMPLE 2', 'GRAPHICAL INTERPRETATION OF FUNCTIONS', FALSE, null),
(1, 9, 'SECTION 1.1 EXAMPLE 3', 'INTERPRETING GRAPHS', FALSE, NULL),
(1, 10, 'SECTION 1.1 EXAMPLE 4', 'SKETCHING GRAPHS', FALSE, NULL),
(1, 11, 'SECTION 1.1 EXAMPLE 5', 'SKETCHING GRAPHS', FALSE, NULL),
(1, 12, 'SECTION 1.1 EXAMPLE 6', 'FINDING EQUATIONS FOR FUNCTIONS', FALSE, 'thedomainofafunction.pdf')


insert into videos
(video_title, video_url, video_problem, video_thumbnail)
values
('LECTURE VIDEO: FUNCTIONS', 'https://i.vimeocdn.com/video/632488315.webp?mw=700&mh=394', NULL, 'https://i.vimeocdn.com/video/632488315.webp?mw=700&mh=394'),
('LECTURE VIDEO: DOMAIN AND RANGE', 'https://i.vimeocdn.com/video/632488438.webp?mw=700&mh=394', NULL, 'https://i.vimeocdn.com/video/632488438.webp?mw=700&mh=394'),
('LECTURE VIDEO: THE VERTICAL LINE TEST', 'https://i.vimeocdn.com/video/632488483.webp?mw=700&mh=394', NULL, 'https://i.vimeocdn.com/video/632488483.webp?mw=700&mh=394'),
('LECTURE VIDEO: PIECEWISE FUNCTIONS', 'https://i.vimeocdn.com/video/632488546.webp?mw=700&mh=394', NULL, 'https://i.vimeocdn.com/video/632488546.webp?mw=700&mh=394'),
('LECTURE VIDEO: SYMMETRY OF FUNCTIONS', 'https://i.vimeocdn.com/video/632488639.webp?mw=700&mh=394', NULL, 'https://i.vimeocdn.com/video/632488639.webp?mw=700&mh=394'),
('LECTURE VIDEO: INCREASING AND DECREASING', 'https://i.vimeocdn.com/video/632488601.webp?mw=700&mh=394', NULL, 'https://i.vimeocdn.com/video/632488601.webp?mw=700&mh=394'),
('SECTION 1.1 EXAMPLE 1', 'https://i.vimeocdn.com/video/598164835.webp?mw=600&mh=360', NULL, 'https://i.vimeocdn.com/video/598164835.webp?mw=600&mh=360'),
('SECTION 1.1 EXAMPLE 2', 'https://i.vimeocdn.com/video/598161670.webp?mw=600&mh=360', null, 'https://i.vimeocdn.com/video/598161670.webp?mw=600&mh=360'),
('SECTION 1.1 EXAMPLE 3', 'https://i.vimeocdn.com/video/598161973.webp?mw=600&mh=360', null, 'https://i.vimeocdn.com/video/598161973.webp?mw=600&mh=360'),
('SECTION 1.1 EXAMPLE 4', 'https://i.vimeocdn.com/video/598162332.webp?mw=600&mh=360', null, 'https://i.vimeocdn.com/video/598162332.webp?mw=600&mh=360'),
('SECTION 1.1 EXAMPLE 5', 'https://i.vimeocdn.com/video/598162149.webp?mw=600&mh=360', null, 'https://i.vimeocdn.com/video/598162149.webp?mw=600&mh=360'),
('SECTION 1.1 EXAMPLE 6', 'https://i.vimeocdn.com/video/598162147.webp?mw=600&mh=360', null, 'https://i.vimeocdn.com/video/598162147.webp?mw=600&mh=360')

insert into user_testimonials
(testimonial_author, testimonial_text)
values
('Bryce', `I absolutely love your videos. My teacher is a great guy but doesn't know how to teach very well especially to people like me who have no calculus background. I've enjoyed your videos thus far. They have been extremely helpful in teaching me everything. Thank you`),
('Cooper B.', `These short and simple videos taught me everything I needed to know to pass the exam with flying colors. It was the best $20 I've ever spent! Thank you!`),
('Taylor', `Your explanations made it so much more clear. I was usually confused after the lectures and you always cleared it up. Your explanations are the only reason I'm getting a good grade in Calculus.`)