var path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env')})

const fs = require('fs')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const mongoCon = mongoose.createConnection(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URL}`, {useNewUrlParser:true, useUnifiedTopology:true})
mongoCon.on('error', console.error.bind(console, 'MongoDB connection error:'));
var db = new Map()

const modelFiles = fs.readdirSync(`${__dirname}`).filter(file => file.endsWith('.js'));

for (const file of modelFiles) {
    if (file != "db.js") {
        const model = require(`./${file}`);
        db.set(model.name,mongoCon.model(model.name,model.schema))
    }
}

module.exports = db

/**
 * Example DB file
 * 
 
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = {
    name:"nameString",
    schema:
    new Schema(
        {
            field1: {
                type:String,
                required:true
            },
            field2: {
                [{
                    elem1:String,
                    elem2:Object
                }]
            }
            
        }),
}
 */
