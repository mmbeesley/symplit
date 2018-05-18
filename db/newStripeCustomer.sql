update users
set stripe_customer_id = $1
where user_id = $2
returning *