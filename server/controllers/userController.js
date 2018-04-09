module.exports = {

    serialize: (user, done) => {
        return done(null, user);
    },

    deserialize: (user, done) => {
        const db = app.get('db');
    
        db.find_user([user.id]).then((foundUser)=>{
            return done(null, Object.assign(foundUser[0], { token: user.token }))
        })
    },

    loginUser: (req, res) => {
        if (!req.user) {
            res.status(404).send('User not found');
        } else {
            console.log(req.user)
            res.status(200).send(req.user)
        }
    },

    logoutUser: (req, res) => {
        req.logOut();
        res.redirect(process.env.LOGOUT_REDIRECT)
    },

    getOneUser: (req, res) => {
        const db = app.get('db');
        const { userId } = req.params;

        db.get_user([userId]).then(user=>{
            res.status(200).send(user);
        })
    },

    getUsers: (req, res) => {
        const db = app.get('db');

        db.get_allusers().then((users) => {
            res.status(200).send(users)
        })
    },

    makeAdmin: (req, res) => {
        const db = app.get('db');
        const { userId } = req.params;

        db.create_admin([userId]).then((newAdmin) => {
            res.status(200).send(newAdmin)
        })
    },

    removeAdmin: (req, res) => {
        const db = app.get('db');
        const { userId } = req.params;

        db.remove_admin([userId]).then((user) => {
            res.status(200).send(user);
        })
    },

    unsubscribe: (req, res) => {
        const db = app.get('db');
        const { userId } = req.params;

        db.unsubscribe([userId]).then((user) => {
            res.status(200).send(user)
        })
    },

    getSearchUsers: (req, res) => {
        const db = app.get('db');
        const search = '%' + req.query.user.toUpperCase() + '%'

        db.get_searchusers([search]).then(users=>{
            res.status(200).send(users);
        })
    }
}