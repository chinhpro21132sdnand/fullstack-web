const ancolDrink = require("../../models/drink/ancoldrink");
const PaginationService = require("../../common/pagination");

const ancolDrinkController = {
  getAllancoldrink: async (req, res) => {
    const { current, page } = req.query;
    const pagi = await PaginationService(
      parseInt(current),
      parseInt(page),
      ancolDrink
    );
    const getallAncol = await ancolDrink.find().limit(page).skip(pagi.skip);
    res.status(200).json({
      success: true,
      data: getallAncol,
      pagination: pagi,
    });
  },
  addAncoldrink: async (req, res) => {
    try {
      const payload = new ancolDrink(req.body);
      const newAncoldrink = await payload.save();
      res.status(201).json({
        status: 200,
        data: newAncoldrink,
      });
    } catch (e) {
      res.status(400).json({
        status: 400,
        error: e.message,
      });
    }
  },
  getDetailAncoldrink: async (req, res) => {
    try {
      const ancolDrinkDetail = await ancolDrink.findById(req.params.id);
      if (!ancolDrinkDetail) {
        res.status(404).json({ message: "ko thấy ancol drink" });
      }
      res.status(200).json({
        status: 200,
        data: ancolDrinkDetail,
      });
    } catch (err) {
      res.status(400).json({
        status: 400,
        message: "data error",
      });
    }
  },
  updateAncoldrink: async (req, res) => {
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
        const ancolDrinkUpdate = await ancolDrink.findByIdAndUpdate(
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

        if (!ancolDrinkUpdate) {
          return res.status(404).json({ message: "Ancol drink not found" });
        }
        res.status(200).json({
          status: 200,
          data: ancolDrinkUpdate,
        });
      }
    } catch (err) {
      res.status(400).json({
        status: 400,
        message: "lỗi cập nhật đồ uống có cồn",
      });
    }
  },
  deleteAncoldrink: async (req, res) => {
    try {
      if (!req.params.id) {
        return res.status(400).json({ message: "id is required" });
      } else {
        const ancolDrinkDelete = await ancolDrink.findByIdAndDelete(
          req.params.id
        );
        if (!ancolDrinkDelete) {
          return res.status(404).json({ message: "Ancol drink not found" });
        }
        res.status(200).json({
          status: 200,
          message: "xóa đồ uống thành công",
        });
      }
    } catch (error) {
      res.status(400).json({
        status: 400,
        message: "lỗi data ko xóa được",
      });
    }
  },
};
module.exports = ancolDrinkController;
