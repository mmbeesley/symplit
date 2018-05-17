update memberships
set available = $2
where membership_id = $1
returning *