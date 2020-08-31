var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = {
    name:"ingredients",
    schema:
    new Schema(
        {
            name:{
                type:String,
                required:true
            },
            pump:{
                type:Number,
                required:true
            },
            booze:{
                type:Boolean,
            }
        }
    )
  }