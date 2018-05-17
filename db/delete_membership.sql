delete from memberships
where membership_id = $1
returning $1