//template/structure/model of document for shotUrl
//require mongoose
const mongoose = require('mongoose');


//structure
const Schema = mongoose.Schema;
//- mongoose makes a primary key we don't need to do it.

const urlSchema = new Schema({
    //rough way we expect structure of documnets (rows of the sql table)
    originalUrl: String,
    shorterUrl: String
}, {timestamps: true});

//define model class below. "shortUrl" is the table.
//NOTE THAT WHEN YOU SHOW DBS IN MONGO IT MIGHT NOT SHOW UNTIL WE HAVE ACTUAL DATA INSIDDE IT.
const ModelClass = mongoose.model('shortUrl', urlSchema);

module.exports = ModelClass;
