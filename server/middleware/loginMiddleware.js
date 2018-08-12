require("dotenv").config();
const passport = require("passport");

module.exports = {
  storePath: (req, res, next) => {
    req.session.redirectPath = req.query.redirectPath;
    next();
  },

  authenticate: (req, res, next) => {
    let auth = passport.authenticate("auth0", {
      successRedirect: `${process.env.REACT_APP_HOME_REDIRECT}${
        req.session.redirectPath
      }`,
      failureRedirect: `${process.env.REACT_APP_HOME_REDIRECT}/failedlogin`
    });

    auth(req, res, next);
  }
};
