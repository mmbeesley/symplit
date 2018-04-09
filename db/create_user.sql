insert into users
(auth_id, user_display_name)
values
($1, $2)
returning *