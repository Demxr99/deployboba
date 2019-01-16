// dependencies
const express = require('express');
const connect = require('connect-ensure-login');

const User = require('../models/user');
const Location = require('../models/location');

const router = express.Router();

// api endpoints
router.post(
    '/location', 
    function(req, res) {
        const newLocation = new Location({
            'name' : req.body.name,
            'address' : req.body.address,
            'zip': req.body.zip_code,
            'rating': req.body.rating,
            'popDrinks': req.body.drinks,
        });

        newLocation.save()
            .then(location => {
                const io = req.app.get('socketio');
                io.emit('location', location);
            })
            .catch(err => {
                console.log(err);
            });
        res.send({});
    }
);
module.exports = router;