const path = require('path'); 
require('dotenv').config({ path: path.join(__dirname, '../.env')})
var express = require('express');
var router = express.Router();
var passport = require('passport')
const { body,validationResult,sanitizeBody } = require('express-validator');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Drink and Vibe Engine Web Console' });
});
 /* POST login */
router.post('/',passport.authenticate('local',{ 
  failureRedirect:'/',
  successRedirect:'/menu'
}),function(req,res,next) {
  if (err) next(err)
})

router.get('/menu', function(req,res,next) {
  if (req.isAuthenticated()) {
    res.render('menu',{ title: 'Drink and Vibe Engine Web Console' })
  } else {
    res.redirect('/')
  }
})
module.exports = router;
