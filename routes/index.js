var express = require('express');
var router = express.Router();
var User = require('../models/user')

// GET /register
router.get('/register', (req, res, next) => {
  res.render('register', {title: 'Sign Up'});
});

// POST /register
router.post('/register', (req, res, next) =>{
  if (
    req.body.email &&
    req.body.name &&
    req.body.favoriteBook &&
    req.body.password &&
    req.body.confirmPassword
  ) {
    if (req.body.password !== req.body.confirmPassword) {
      var err = new Error('Passwords do not match.');
    }
    // create an object from the user data
    var userData = {
      email: req.body.email,
      name: req.body.name,
      favoriteBook: req.body.favoriteBook,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword
    };
    
    //use the schema's create method to insert the document into mongo
    User.create(userData, function(error, user) {
      if (error) {
        return next(error);
      }
      else{
        return res.redirect('.profile');
      }
    });
  }
  else {
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }

});


// GET /
router.get('/', function(req, res, next) {
  return res.render('index', { title: 'Home' });
});

// GET /about
router.get('/about', function(req, res, next) {
  return res.render('about', { title: 'About' });
});

// GET /contact
router.get('/contact', function(req, res, next) {
  return res.render('contact', { title: 'Contact' });
});

module.exports = router;
