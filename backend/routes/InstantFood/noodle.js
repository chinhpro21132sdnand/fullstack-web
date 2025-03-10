const noodle = require("../../controllers/InstantFood/noodle");

const router = require("express").Router();

router.get("/instantFood/noodle", noodle.getAllnoodle);

router.post("/instantFood/noodle", noodle.addNoodle);

router.get("/instantFood/noodle/:id", noodle.detailNoodle);

router.post("/instantFood/noodle/:id", noodle.updateNoodle);

router.delete("/instantFood/noodle/:id", noodle.delletedNoodle);
module.exports = router;
