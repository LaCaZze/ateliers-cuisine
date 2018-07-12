var mongoose = require('mongoose');

var Particulier = require("../models/Particulier");

var particulierController = {};


//Liste les participants inscript
particulierController.listIncrit = function (req, res) {
    Particulier.find({}).exec(function (err, particulier) {

            console.log(particulier)
            res.render("../views/cuisinier/incrit", { particulier: particulier });

    });
  };





//export du module
module.exports = particulierController;