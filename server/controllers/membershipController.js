module.exports = {

    getMemberships: (req,res) => {
        const db = req.app.get('db');

        db.get_allmemberships().then(memberships => {
            res.status(200).send(memberships);
        })
    },

    getOneMembership: (req,res) => {
        const db = req.app.get('db');
        const { membershipId } = req.params;

        db.get_membership([membershipId]).then(membership => {
            res.status(200).send(membership);
        })
    },

    createMembership: (req,res) => {
        const db = req.app.get('db');
        const {membership_title, membership_description, membership_price, membership_recurring } = req.body;

        db.create_membership([membership_title, membership_description, membership_price, membership_recurring]).then(newMembership => {
            res.status(200).send(newMembership)
        })
    },

    updateMembership: (req,res) => {
        const db = req.app.get('db');
        const {membership_title, membership_description, membership_price, membership_recurring} = req.body;
        const {membershipId} = req.params;

        db.update_membership([membershipId, membership_title, membership_description, membership_price, membership_recurring]).then(updated => {
            res.status(200).send(updated)
        })
    },

    deleteMembership: (req,res) => {
        const db = req.app.get('db');
        const {membershipId} = req.params;

        db.delete_membership([membershipId]).then(deleted => {})
    }

}