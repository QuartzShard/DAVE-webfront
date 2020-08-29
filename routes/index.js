const path = require('path'); 
require('dotenv').config({ path: path.join(__dirname, '../.env')})
var express = require('express');
var router = express.Router();
var passport = require('passport')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Drink and Vibe Engine Web Console' });
});
 /* POST login */
router.post('/',passport.authenticate('local',{ 
  failureRedirect:'/',
  successRedirect:'/app/menu'
}),function(req,res,next) {
  res.end()
})

module.exports = router;
