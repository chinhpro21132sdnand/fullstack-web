const ancolDrink = require("../../controllers/drink/ancolDrink");

const router = require("express").Router();

router.get("/drink/ancolDrink", ancolDrink.getAllancoldrink);

router.post("/drink/ancolDrink", ancolDrink.addAncoldrink);

router.get("/drink/ancolDrink/:id", ancolDrink.getDetailAncoldrink);

router.post("/drink/ancolDrink/:id", ancolDrink.updateAncoldrink);

router.delete("/drink/ancolDrink/:id", ancolDrink.deleteAncoldrink);
module.exports = router;
