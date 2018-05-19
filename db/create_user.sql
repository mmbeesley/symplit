insert into users
(auth_id, user_email, user_name)
values
($1, $2, $3)
returning *