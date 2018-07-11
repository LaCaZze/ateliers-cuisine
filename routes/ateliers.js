var express = require('express');
var router = express.Router();

var atelier = require("../controllers/AtelierController");

//recuperer les ateliers
// router.get("/", atelier.list);

//recuperer les ateliers active
router.get("/admin", atelier.listAdmins);

//cree un atelier
router.get("/create", atelier.create);

//sauvegarder un atelier. /!\ cest un POST 
router.post("/save", atelier.save);

//editer une atelier
router.get("/edit/:id", atelier.edit);

//editer une inscription pour un atelier
router.get("/inscription/:id", atelier.inscription);

//voir un machine par son id
router.get("/show/:id", atelier.show);

//edit update.  /!\ cest un POST 
router.post("/update/:id", atelier.update);


//edit update pour les place reservé.  /!\ cest un POST 
router.post("/saveInscription/:id", atelier.saveInscription);


module.exports = router;