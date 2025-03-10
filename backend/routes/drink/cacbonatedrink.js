const cabonatedDrinkController = require("../../controllers/drink/cabonatedrinkController");

const router = require("express").Router();
//getall
router.get(
  "/drink/cacbonatedDrink",
  cabonatedDrinkController.getAllcacbonateddrink
);
// thêm vegatable
router.post(
  "/drink/cacbonatedDrink",
  cabonatedDrinkController.addCacbonatedDrink
); //
// chi tiết vegatable
router.get(
  "/drink/cacbonatedDrink/:id",
  cabonatedDrinkController.detailCacbonateDrink
);
// // update vegatable
router.post(
  "/drink/cacbonatedDrink/:id",
  cabonatedDrinkController.updateCacbonatedDrink
); //
// delete vegatable
router.delete(
  "/drink/cacbonatedDrink/:id",
  cabonatedDrinkController.deleteCacbonatedDrink
); //
module.exports = router;
