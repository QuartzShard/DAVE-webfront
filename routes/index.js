const path = require('path'); 
require('dotenv').config({ path: path.join(__dirname, '../.env')})
var express = require('express');
var router = express.Router();
var passport = require('passport')
var {body} = require('express-validator')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Drink and Vibe Engine Web Console' });
});

 /* POST login */
router.post('/',[body(['username','password']).escape().exists()],passport.authenticate('local',{ 
  failureRedirect:'/',
  successRedirect:'/app/menu'
}),function(req,res,next) {
  res.end()
})

/**
 * Log out route, redirects to login
 */
router.get('/logout',function(req,res,next){
  req.logOut()
  res.redirect('/')
})

module.exports = router;
