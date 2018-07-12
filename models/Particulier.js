var mongoose = require('mongoose');

// var ParticulierSchema = new mongoose.Schema({
//     nom: String,
//     prenom: String,
//     mail: String,

// });

var ParticulierSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,

});


module.exports = mongoose.model("Particulier", ParticulierSchema);