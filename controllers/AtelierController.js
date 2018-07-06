var mongoose = require('mongoose');

var Atelier = require("../models/Atelier");

var atelierController = {};



//redirection à la page de creation de machine
atelierController.create = function(req, res){
    res.render("../views/atelier/create");
}; 

//enregistrement des machines
atelierController.save = function(req, res){
    var atelier = new Atelier(req.body);

    atelier.save(function(err){
        if(err){
            console.log(err);
            res.render("../views/atelier/create");
        } else{
            console.log("creation atelier OK");
            res.redirect("/ateliers/show/" + atelier._id);
        } 
    });
};


//Affiche 1 utilisateur par son id
atelierController.show = function(req, res) {
    Atelier.findOne({_id:req.params.id}).exec(function(err, atelier){
        if(err){
            console.log('Error : ', err);
        }else{
            res.render("../views/atelier/show",{atelier:atelier});
        } 
    });
};

//export du module
module.exports = atelierController;