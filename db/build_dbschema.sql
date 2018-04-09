create table users
(user_id serial primary key
, user_first_name varchar(180)
, user_last_name varchar(180)
, user_email varchar(180)
, auth_id varchar(180)
, membership_id integer
, is_admin boolean)

create table memberships
(membership_id serial primary key
, membership_title varchar(180)
, membership_desc text
, membership_price numeric(10,2)
, membership_recurring boolean
, membership_period integer)

create table offers
(offer_id serial primary key
, offer_title varchar(180)
, offer_code varchar(10)
, disount numeric(10,2))

create table books
(book_id serial primary key
, book_title varchar(180)
, book_subtitle varchar(180)
, book_image text
, book_subject varchar(180)
, author text[]
, membership_required_book boolean
, membership_ids_book integer[]
, visible boolean)

create table chapters
(chapter_id serial primary key
, book_id integer
, book_chapter integer
, chapter_title varchar(180)
, chapter_text text
, membership_required_chapter boolean
, membership_ids_chapter integer[])

create table sections
(section_id serial primary key
, section_number varchar(20)
, section_title varchar(180)
, chapter_id integer
, section_text text
, membership_required_section boolean
, membership_ids_section integer[]
, practice_problems_ids integer[]
, section_handout text)

create table section_videos
(section_video_id serial primary key
, section_id integer
, video_id integer
, section_video_title varchar(180)
, section_video_text text
, membership_required_video boolean
membership_ids integer[])

create table videos
(video_id serial primary key
, video_title varchar(180)
, video_url text
, video_problem text
, video_thumbnail text)

create table practice_problems
(problem_id serial primary key
, problem_title varchar(180)
, problem_image text
, problem_solution text
, membership_required_problem boolean
, membership_ids integer[])

create table user_testimonials
(testimonial_id serial primary key
, testimonial_author varchar(180)
, testimonial_text text)

create table user_saved_books
(saved_id serial primary key
, user_id integer
, book_id integer)