var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = {
    name:"users",
    schema:
    new Schema(
        {
            username: {
                type:String,
                required:true
            },
            password: {
                type:String,
                required:true,
            }
        }),
}