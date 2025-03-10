const coffeDrink = require("../../controllers/drink/coffeDrink");

const router = require("express").Router();

router.get("/drink/coffeDrink", coffeDrink.getAllcoffeDrink);

router.post("/drink/coffeDrink", coffeDrink.addcoffeDrink);

router.get("/drink/coffeDrink/:id", coffeDrink.getDetailcoffeDrink);

// router.post("/drink/coffeDrink/:id", coffeDrink.updatecoffeDrink);

// router.delete("/drink/coffeDrink/:id", coffeDrink.deletecoffeDrink);
module.exports = router;
