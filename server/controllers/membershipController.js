const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = {

    getMemberships: (req, res) => {
        const db = req.app.get('db');

        db.get_allmemberships().then(memberships => {
            res.status(200).send(memberships);
        })
    },

    getOneMembership: (req, res) => {
        const db = req.app.get('db');
        const { membershipId } = req.params;

        db.get_membership([membershipId]).then(membership => {
            res.status(200).send(membership);
        })
    },

    createMembership: (req, res) => {
        if (req.user.is_admin) {
            const db = req.app.get('db');
            const { membership_title, membership_desc, membership_price, membership_recurring } = req.body;
            let membership_period = req.body.membership_period;
            const amount = Math.round(membership_price * 100);
            if(membership_period == ''){
                membership_period = null;
            }

            if (membership_recurring) {
                const product = stripe.products.create({
                    name: membership_title,
                    type: 'service'
                }).then(response => {
                    const plan = stripe.plans.create({
                        product: response.id,
                        currency: 'usd',
                        interval: 'month',
                        interval_count: membership_period,
                        amount: amount,
                    }).then(newPlan => {
                        db.create_membership([membership_title, membership_desc, membership_price, membership_recurring, membership_period, newPlan.id, false]).then(newMembership => {
                            res.status(200).send(newMembership)
                        })
                    })
                })
            } else {
                db.create_membership([membership_title, membership_desc, membership_price, false, membership_period, null, false]).then(newMembership => {
                    res.status(200).send(newMembership)
                })
            }
        } else {
            res.status(403).send('Unauthorized');
        }
    },

    updateMembership: (req, res) => {
        if (req.user.is_admin) {

            const db = req.app.get('db');
            const { available } = req.body;
            const { membershipId } = req.params;

            db.update_membership([membershipId, available]).then(updated => {
                db.get_allmemberships().then(memberships => {
                    res.status(200).send(memberships)
                })
            })
        } else {
            res.status(403).send('Unauthorized');
        }
    },

    updateMembershipDetails: (req,res) => {
        if (req.user.is_admin) {

            const db = req.app.get('db');
            const {membership_title, membership_desc } = req.body;
            const {membershipId} = req.params;

            db.update_membershipdetails([membershipId, membership_title, membership_desc]).then(updated => {
                db.get_allmemberships().then(memberships => {
                    res.status(200).send(memberships)
                })
            })
        } else {
            res.status(403).send('Unauthorized');
        }
    },

    deleteMembership: (req, res) => {
        if (req.user.is_admin) {

            const db = req.app.get('db');
            const { membershipId } = req.params;

            db.delete_membership([membershipId]).then(deleted => {
                db.get_allmemberships().then(memberships => {
                    res.status(200).send(memberships)
                })
            })
        } else {
            res.status(403).send('Unauthorized');
        }
    }

}