const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = {
    payment: (req, res, next) => {
        const db = req.app.get('db');
        const date = new Date();
        const user = req.user.user_id;
        const {memId} = req.body
        
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
    
        const charge = stripe.charges.create({
            amount: convertedAmt, // amount in cents, again
            currency: 'usd',
            source: req.body.token.id,
            description: 'New member'
        }, function (err, charge) {
            if (err) return res.sendStatus(500, "Payment error")
            db.create_member([user, memId]).then((newMember) => {
                res.status(200).send(newMember);
            })
        });
    }
}