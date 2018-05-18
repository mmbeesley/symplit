update memberships
set membership_title = $2,
membership_desc = $3
where membership_id = $1
returning *