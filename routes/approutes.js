const path = require('path'); 
require('dotenv').config({ path: path.join(__dirname, '../.env')})
const fs = require('fs')
var express = require('express');
var router = express.Router();
var passport = require('passport')
var {body} = require('express-validator')
var db = require('../db/db')

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

router.get('/',function(req,res,next){
  var buttons = []
  var pages = fs.readdirSync(path.join(__dirname, '../views/app')).filter(file => file.endsWith('.ejs'));
  for (let page of pages) {
      if (page != "index.ejs") {
        buttons.push(page)
    }
  }
  res.render('app/index', {title: 'Drink and Vibe Engine Web Console', buttons:buttons})
})

router.get('/menu', function(req,res,next) {
      res.render('app/menu',{ title: 'Drink and Vibe Engine Web Console' }) 
})

router.get('/newuser', function(req,res,next) {
  res.render('app/newUser',{ title: 'Drink and Vibe Engine Web Console' }) 
})

router.post('/newuser',[body(['username','password']).escape().exists()], function(req,res,next){
  var user = db.get('users')
  var newUser = new user({username:req.body.username,password:req.body.password}) 
  newUser.save().then(res.redirect('/app/menu'))
})
module.exports = router;
