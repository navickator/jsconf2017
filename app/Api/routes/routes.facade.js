var registerRoute = require("./register.route.js");
var raffleRoute = require("./raffle.route.js");


/**
 * Routes definition
 * @param router
 */
var routes = function (router) {

    router.get("/", function (req, res) {
        res.json({
            message: "Route not defined"
        })
    });

    router.post("/register", function (req, res) {
        return registerRoute(req, res);
    });

    // Get all users
    router.get("/registration", function(req, res){
        return raffleRoute(req, res);
    })
};

module.exports = routes;