module.exports = {

    getOffers: (req,res) => {
        const db = req.app.get('db');

        db.get_alloffers().then(offers => {
            res.status(200).send(offers)
        })
    },

    getOneOffer: (req,res) => {
        const db = req.app.get('db');
        const {offerId} = req.params;

        db.get_offer([offerId]).then(offer => {
            res.status(200).send(offer);
        })
    },

    createOffer: (req,res) => {
        const db = req.app.get('db');
        const {offer_title, offer_code, discount} = req.body;
        
        db.create_offer([offer_title, offer_code, discount]).then(newOffer => {
            res.status(200).send(newOffer);
        })
    },

    updateOffer: (req,res) => {
        const db = req.app.get('db');
        const {offer_title, offer_code, discount} = req.body;
        const {offerId} = req.params;

        db.update_offer([offerId, offer_title, offer_code, discount]).then(udpated => {
            res.status(200).send(udpated);
        })
    },

    deleteOffer: (req,res) => {
        const db = req.app.get('db');
        const {offerId} = req.params;

        db.delete_offer([offerId]).then(deleted => {})
    }

}