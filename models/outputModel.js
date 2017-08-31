
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var outputsSchema = new Schema({
    status: {type:String}
});


module.exports = mongoose.model('outputs',outputsSchema);