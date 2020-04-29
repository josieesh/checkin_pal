const Sequelize = require("sequelize");

function validateCheckinRequest(req,res,next) {
    // Validates and santizes input
    
    var {lng, lat} = req.body
    if (!(lng && lat)) {
        res.status(500).send();
    }
    lng = new Number(lng).toFixed(3);
    lat = new Number(lat).toFixed(3);
    req.body = {lat: lat, lng: lng}
    console.log(req.body)

    next()

}

module.exports = {validateCheckinRequest}