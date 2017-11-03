var RegisterController = require("../model/register.controller.js");
var localizationFactory = require("../localization/localization.factory.js");
var localization = localizationFactory.getResources();

var register = function (req, res) {
    var register = new RegisterController();

    register.isValidCode(req.body.code).then(function (response) {

        if (response) {
            register.registerUser(req.body).then(function (addUserResponse) {
                register.activateCode(req.body.code).then(function () {
                    res.json({
                        status: "ok",
                        message: localization.SUCCESS_REGISTER
                    });
                });
            }).catch(function (err) {
                var message = (err.message.indexOf("ER_DUP_ENTRY") > -1)? localization.ERR_DUP_ENTRY : localization.ERR_GENERAL;
                res.json({
                    status: "error",
                    message: message
                })
            });
        } else {
            res.json({
                status: "error",
                message: localization.ERR_INVALID_CODE
            });
        }
    });
};

module.exports = register;