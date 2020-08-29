const path = require('path'); 
require('dotenv').config({ path: path.join(__dirname, '../.env')})
var express = require('express');
var router = express.Router();
var passport = require('passport')

/** 
 * Redirect any unauthenticated users away from here
 */
router.use(function(req,res,next){
    if (req.isAuthenticated()) {
        next()
      } else {
        res.redirect('/')
      }
})

router.get('/menu', function(req,res,next) {
      res.render('menu',{ title: 'Drink and Vibe Engine Web Console' }) 
})

module.exports = router;
