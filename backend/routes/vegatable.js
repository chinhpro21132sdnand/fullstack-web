const VegatableController = require("../controllers/vegatableController");

const middlewareController = require("../controllers/middleware");

const router = require("express").Router();
//getall
router.get("/vegatable", VegatableController.getAllVegatable);
//thêm vegatable
router.post("/addVegatable", VegatableController.addVegatable); //
// chi tiết vegatable
router.get("/detailsVegatable/:id", VegatableController.getDetailVegatable);
// update vegatable
router.post("/updateVegatable/:id", VegatableController.updateVegatable); //
// delete vegatable
router.delete("/deleteVegatable/:id", VegatableController.deleteVegatable); //
module.exports = router;
