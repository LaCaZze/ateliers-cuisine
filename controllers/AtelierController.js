var mongoose = require('mongoose');

var Atelier = require("../models/Atelier");

var atelierController = {};

//Liste les ateliers activé
// atelierController.list = function (req, res) {
//     Atelier.find({}).exec(function (err, ateliers) {
//         if (err) {
//             console.log('Error : ', err);
//         } else {
//             console.log(ateliers)
//             res.render("../views/atelier/index", { ateliers: ateliers });
//         }
//     });
// };

//Liste les ateliers activé
atelierController.list = function (req, res, next) {
    Atelier.find({}).exec(function (err, ateliers) {
        if (err) {
            console.log('Error : ', err);
        } else {
           // console.log(ateliers)
            req.body.ateliers = ateliers
           // console.log("req.body.ateliers =====",req.body.ateliers)
            next();
        }
    });
};

//Liste les ateliers dans la page admins
atelierController.listAdmins = function (req, res) {
    Atelier.find({}).exec(function (err, ateliers) {
        if (err) {
            console.log('Error : ', err);
        } else {
            console.log(ateliers)
            res.render("../views/atelier/admin", { ateliers: ateliers });
        }
    });
};

//redirection à la page de creation d'un atelier'
atelierController.create = function(req, res){
    res.render("../views/atelier/create");
}; 

//enregistrement des ateliers
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


//Affiche 1 atelier par son id
atelierController.show = function(req, res) {
    Atelier.findOne({_id:req.params.id}).exec(function(err, atelier){
        if(err){
            console.log('Error : ', err);
        }else{
            res.render("../views/atelier/show",{atelier:atelier});
        } 
    });
};

//edition d'une atelier par son id
atelierController.edit = function(req, res){
    var atelier = new Atelier(req.body);

    Atelier.findOne({_id:req.params.id}).exec(function(err, atelier){
        if(err){
            console.log("Error ", err);
        } else{
            res.render("../views/atelier/edit",{atelier: atelier} );
        } 
    });
};


//gestion de l'edition d'un atelier
atelierController.update = function(req, res){
    Atelier.findByIdAndUpdate(req.params.id,{ $set :{titre: req.body.titre, description: req.body.description, date: req.body.date, horaire: req.body.horaire, duree: req.body.duree, place_disponible: req.body.place_disponible, place_reserve: req.body.place_reserve, prix: req.body.prix, image: req.body.image, active: req.body.active } },{new: true}, function (err, atelier){

        if (err){
            console.log(err);
            res.render("../views/atelier/edit",{atelier:req.body} );
        } 
        res.redirect("/ateliers");
        
    });
};

//export du module
module.exports = atelierController;