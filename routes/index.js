const path = require('path'); 
require('dotenv').config({ path: path.join(__dirname, '../.env')})
var express = require('express');
var router = express.Router();
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Drink and Vibe Engine Web Console' });
});
 /* POST login */
router.post('/',function(req,res,next) {
  if (req.body.key == process.env.KEY) {
    res.redirect('/menu')
  }
  res.redirect('/')
})

router.get('/menu', function(req,res,next) {
  res.render('menu',{ title: 'Drink and Vibe Engine Web Console' })
})
module.exports = router;
