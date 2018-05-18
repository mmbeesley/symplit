update users
set membership_id = $2,
membership_start_date = $3
where user_id = $1
returning *