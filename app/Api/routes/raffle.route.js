var RegisterController = require("../model/register.controller.js");


var raffle = function (req, res) {
    var register = new RegisterController();

    register.getRegistrations().then(function (response) {
        var users = [];

        /*for(var i=0,l=response.length; i<l; i++){
            users.push(response[i].name);
        }*/

        res.json({
            status:"ok",
            message: response
        })
    });
};

module.exports = raffle;