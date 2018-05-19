const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = {
    payment: (req, res, next) => {
        const db = req.app.get('db');
        const date = new Date();
        const {user_id, user_email, stripe_customer_id} = req.user;
        const { membership, amount } = req.body

        //convert amount to pennies
        const amountArray = req.body.amount.toString().split('');
        const pennies = [];
        for (var i = 0; i < amountArray.length; i++) {
            if (amountArray[i] === ".") {
                if (typeof amountArray[i + 1] === "string") {
                    pennies.push(amountArray[i + 1]);
                } else {
                    pennies.push("0");
                }
                if (typeof amountArray[i + 2] === "string") {
                    pennies.push(amountArray[i + 2]);
                } else {
                    pennies.push("0");
                }
                break;
            } else {
                pennies.push(amountArray[i])
            }
        }

        const convertedAmt = parseInt(pennies.join(''));
        if(!membership.membership_recurring && !membership.membership_period ) {
            //one time charge for lifetime purchases
            
            const charge = stripe.charges.create({
                amount: convertedAmt, // amount in cents, again
                currency: 'usd',
                source: req.body.token.id,
                description: 'New member'
            }, function (err, charge) {
                if (err) { return res.sendStatus(500, "Payment error") }
                db.create_member([user_id, membership.membership_id, date]).then((newMember) => {
                    res.status(200).send(newMember);
                })
            });
        } else {
            //create customer and add to existing plan. Auto bills customer for next payment period for known recurring payment plans.
            const customer = stripe.customers.create({
                email: user_email,
                source: req.body.token.id
            }).then(response => {
                db.newStripeCustomer([response.id, user_id]).then(customer => {
                    const subscription = stripe.subscriptions.create({
                        customer: response.id,
                        items: [{plan: membership.stripe_plan_id}]
                    }).then(sub => {
                        db.create_member([user_id, membership.membership_id, date]).then((newMember => {
                            res.status(200).send(newMember);
                        }))
                    })
                })
            })
        }
    }
}