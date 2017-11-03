var config = require("../config.js");
var en = require("./en.js");

class Localization{
    constructor(){
        this.language = config.language
    }

    getResources(){
        var resource;
        switch (this.language){
            case "en":
                resource = en;
                break;
            default:
                resource = en;
                break;

        }

        return resource;
    }
}

module.exports = new Localization();