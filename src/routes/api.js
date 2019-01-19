// dependencies
const express = require('express');
const connect = require('connect-ensure-login');

const User = require('../models/user');
const Location = require('../models/location');
const Event = require('../models/event');

const router = express.Router();

//api endpoints
router.get('/whoami', function(req,res) {
  if(req.isAuthenticated()){
    res.send(req.user);
  }
  else{
    res.send({});
  }
});

router.get('/user', function(req,res) {
  User.findOne({_id: req.query.googleid}, function(err, user){
    res.send(user);
  })
  // res.send({
  //   name        	: 'Anonymous',
  //   googleid     	: 'anonid',
  //   points   	    : 0,
  //   status        : 'Boba Apprentice',
  //   favStore      : 'None Added',
  //   favDrink      : 'None Added',
  //   badges        : [],
  //   storesVisited : [],
  // });
});

//change user values such as favStore, favDrink, points, or storesVisited
router.post('/user', function(req,res) {
  User.findOne({_id: req.body._id}, function(err,user) {
    user.favStore = req.body.favStore;
    user.favDrink = req.body.favDrink;
    user.points = req.body.points;
    user.storesVisited = req.body.storesVisited;
    user.save();
  });
  res.send({});
});
/*
router.get('/locations', function (req,res) {
  Location.find({}, function(err,locations) {
    res.send(locations);
  });
});
*/
// will add params to narrow down search locations
router.get('/locations', function (req,res) {
  if (req.query.name=='') {
    Location.find({}, function(err,locations) {
      res.send(locations);
    });
  }
  else {
    Location.find({name: req.query.name}, function(err,locations) {
      res.send(locations);
    });
  }
});

router.get('/events', function(req, res) {
  if (req.query.name=='') {
    Event.find({}, function(err,events) {
      res.send(events);
    });
  }
  else {
    Event.find({name: req.query.name}, function(err,events) {
      res.send(events);
    });
  }
});

//add a location
router.post('/locations', connect.ensureLoggedIn(), function(req,res) {
  const newLocation = new Location({
    'name'        	: req.body.name,
    'address'    	  : req.body.address,
    'latLng'        : req.body.latLng,
    'zip'   	      : req.body.zip,
    'rating'        : undefined,
    'popDrinks'     : [],
  });

  newLocation.save(function(err,location) {
    // give the user points if they added a location
    User.findOne({_id:req.user._id}, function(err,user) {
      user.points = user.points + 10;
      user.save();
    });
    if (err) console.log(err);
  });

  res.send({});
});

router.post('/events', connect.ensureLoggedIn(), function(req, res){
  const newEvent = new Event({
    'name'          : req.body.name,
    'address'       : req.body.address,
    'zip'           : req.body.zip,
    'latLng'        : req.body.latLng,
    'timeStart'     : req.body.start,
    'timeEnd'       : req.body.end,
  });

  newEvent.save(function(err, event) {
    // may give user points for adding event 
    if (err) console.log(err);
  });

  res.send({});
});

module.exports=router;
