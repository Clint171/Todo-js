// This should run every time there is a request to the server
// It will check if the user is logged in and if so, attach the user object to the request
const jwt = require("jsonwebtoken");

let authenticate = (req, res, next) => {
    const token = req.cookies["auth-token"];

    if (token) {
        let user = jwt.verify(token, process.env.SECRET);
        req.user = user;
        next();
    }
}
exports.authenticate = authenticate;

let checkAuth = (req, res, next) => {
    authenticate(req, res, next);
    if (req.user) {
        next();
    } else {
        res.redirect("/login");
    }
}
exports.checkAuth = checkAuth;