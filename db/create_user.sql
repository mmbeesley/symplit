insert into users
(auth_id, user_email)
values
($1, $2)
returning *