insert into memberships
(membership_title, membership_desc, membership_price, membership_recurring, membership_period, stripe_plan_id, available)
values
($1,$2,$3,$4,$5,$6,$7)
returning *