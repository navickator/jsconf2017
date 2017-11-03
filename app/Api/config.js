var config = {
    language: "en",
    server: {
        port: process.env.PORT || 8080
    },
    db: {
        server:"localhost",
        port:"3306",
        user:"root",
        password:"",
        database:""
    }
};

module.exports = config;