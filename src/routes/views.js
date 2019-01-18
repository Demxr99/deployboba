// dependencies
const express = require('express');
const router = express.Router();

// public endpoints
router.get('/', function(req, res, next) {
  res.sendFile('home.html', { root: 'src/views' });
});

router.get('/u/profile', function(req, res) {
  res.sendFile('profile.html', { root: 'src/views' });
});

router.get('/map', function(req, res) {
  res.sendFile('maps.html', { root: 'src/views' });
});

router.get('/about', function(req, res) {
  res.sendFile('about.html', { root: 'src/views' });
});

router.get('/add-store-event', function(req, res){
  res.sendFile('add.html', {root: 'src/views'});
})

module.exports = router;
