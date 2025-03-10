const PaginationService = require("../../common/pagination");
const cabonatedDrink = require("../../models/drink/cabonateddrink");

const cabonatedDrinkController = {
  getAllcacbonateddrink: async (req, res) => {
    try {
      const { current, page, name, price } = req.query;
      const pagi = await PaginationService(
        parseInt(current),
        parseInt(page),
        cabonatedDrink
      );
      const cbd = await cabonatedDrink.find().limit(page).skip(pagi.skip);
      res.status(200).json({
        pagination: pagi,
        data: cbd,
      });
    } catch (error) {
      throw new Error(error);
    }
  },
  addCacbonatedDrink: async (req, res) => {
    try {
      const payload = new cabonatedDrink(req.body);
      const data = await payload.save();
      res.status(201).json({
        status: 201,
        success: true,
        message: "cacbonated added successfully",
        data: data,
      });
    } catch (error) {
      res.status(400).json(error);
    }
  },
  updateCacbonatedDrink: async (req, res) => {
    try {
      const { name, content, price, number, unit, supplier, isActive } =
        req.body;
      if (
        !name ||
        !content ||
        !price ||
        !number ||
        !unit ||
        !supplier ||
        !isActive
      ) {
        return res.status(400).json({ message: "All fields are required" });
      } else {
        const updateDrink = await cabonatedDrink.findByIdAndUpdate(
          req.params.id,
          {
            name,
            content,
            price,
            number,
            unit,
            supplier,
            isActive,
          }
        );
        res.status(200).json({
          status: 200,
          success: true,
          message: "Cacbonated updated successfully",
          data: updateDrink,
        });
      }
    } catch (error) {
      res.status(400).json(error);
    }
  },
  detailCacbonateDrink: async (req, res) => {
    try {
      const detailCBD = await cabonatedDrink.findById(req.params.id);
      if (!detailCBD) {
        console.log("Không tìm thấy nước uống có gas này!");
        return null;
      }
      res.status(200).json({ status: 200, data: detailCBD });
    } catch (error) {
      res.status(200).json(error);
    }
  },
  deleteCacbonatedDrink: async (req, res) => {
    try {
      if (!req.params.id) {
        res.status(400).json({ message: "ID is required" });
      } else {
        const deletedcbd = await cabonatedDrink.findByIdAndDelete(
          req.params.id
        );
        if (!deletedcbd) {
          res.status(404).json({ message: "ko tìm thấy đồ uống có ga" });
        }
        res.status(200).json({
          status: 200,
          success: true,
          message: "Cacbonated deleted successfully",
        });
      }
    } catch (err) {
      res.status(400).json({ status: 400, error: err });
    }
  },
};
module.exports = cabonatedDrinkController;
