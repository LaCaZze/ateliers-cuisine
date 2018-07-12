var mongoose = require('mongoose');

var AtelierSchema = new mongoose.Schema({
    titre: String,
    description: String,
    date: { type: Date, default: Date.now } ,
    horaire: String,
    duree: Number,
    place_disponible: Number,
    place_reserve: Number,
    prix: Number,
    image: String,
    active: String
});


// var AtelierSchema = new mongoose.Schema({
//     firstname: String,
//     lastname: String,
//     email: String,

// });

module.exports = mongoose.model("Atelier", AtelierSchema);
// module.exports = mongoose.model("Particulier", ParticulierSchema);