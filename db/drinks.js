var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = {
    name:"drinks",
    schema:
    new Schema(
        {
            name: {
              type:String,
              required:true,
            },
            recipe : [
                {
                    ingredient:{ 
                        type:Schema.Types.ObjectID,
                        ref:'ingredients'
                    },
                    ratio:{
                        type:Number
                    }
                }
            ]
        }
    )
}