var mongoose = require('mongoose');
var Cuisinier = require("../models/cuisinier");
var bcrypt = require('bcrypt');
var session = require('express-session');
var CuisinierController = {};


//Affichier le formulaire d'inscription
CuisinierController.identification = function (req, res) {
  res.render("../views/cuisinier/index");
};

// Créer un login via le formulaire 
CuisinierController.create = function (req, res) {
  res.render("../views/cuisinier/create");
};

//Sauvegarder les informations rentrées dans le formulaire
//dans la collection cuisiniers
CuisinierController.save = function (req, res) {
  if (req.body.cuisiniername &&
    req.body.cuisiniersurname &&
    req.body.cuisinieremail &&
    req.body.cuisinierspecial &&
    req.body.password &&
    req.body.passwordConfirmation) {

    ; var cuisinier = new Cuisinier(req.body);

    cuisinier.save(function (err) {
      if (err) {
        console.log(err);
        res.render("../views/cuisinier/create");
        console.log('CHANGE DE NOM');
      } else {
        console.log("login OK");
        res.redirect("/cuisiniersSession");
        console.log('TA');
      }
    });
  };
}

//fonction qui recupère le username et le password
CuisinierController.auth = function (req, res) {
  var username = req.body.Username;
  var password = req.body.Password;

  Cuisinier.findOne({ cuisiniername: username }).exec(function (err, user) {
    if (!err && user) {
      bcrypt.compare(password, user.password, function (err, result) {
        console.log(result);
        if (result === true) {
          req.session.userId = user._id;
          req.session.Username = user.username;
          req.session.success = 'Connexion Reussie';
          res.redirect('../ateliers/admin');
        } else {
          //console.log(req.session.userName);
          res.redirect('/cuisiniersSession');
        };
      })
    } else {
      console.log("error =>", err);
      return res.redirect('/cuisiniersSession');
    }
  })
};

//fonction de déconnection
CuisinierController.logout = function(req, res){
  if (req.session){
      // supprimer la session
      console.log(req.session);
      req.session.destroy(function(err){
          if(!err){
              res.redirect('/')
          }else {
              console.log("error => ", err);
          }
      })
  }
};


//export du module
module.exports = CuisinierController;