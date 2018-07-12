var express = require('express');
var router = express.Router();

var cuisinier = require("../controllers/CuisinierController");
var particulier = require("../controllers/ParticulierController");

function requireLogin (req, res, next) {
    if (req.session && req.session.userId) {
        next();
    }else {
        var err = new Error('error 404');
        err.status = 401;
        res.redirect('/');
        console.log('TU N AS PAS LE DROIT !!');
    }
}

//recuperer les ateliers active
router.get("/inscrit", particulier.listIncrit);

//renvoi vers inscription et identification cuisinier
router.get("/", cuisinier.identification);

// //creer un login
router.get("/ajoutcuisinier", cuisinier.create);

//creer un login
router.post("/save", cuisinier.save);

// route vers  fonction authentification
router.post('/auth', cuisinier.auth);

// route vers  fonction deconnection
router.get('/logout', cuisinier.logout);

//export du module router
module.exports = router;