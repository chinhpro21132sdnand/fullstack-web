const PaginationService = require("../common/pagination");
const aqp = require("api-query-params");
const Vegatable = require("../models/vegatable");

const VegatableController = {
  getAllVegatable: async (req, res) => {
    try {
      const { current, page, name, price } = req.query;
      console.log(req.query, "req");
      console.log(page, "page");
      let filter = {};
      if (name) {
        filter.name = { $regex: name, $options: "i" };
      }
      if (price) {
        filter.price = price;
      }
      const pagi = await PaginationService(
        parseInt(current),
        parseInt(page),
        Vegatable
      );
      const vegatable = await Vegatable.find(filter)
        .limit(pagi.pageSize)
        .skip(pagi.skip)
        .exec();
      res.status(200).json({
        status: 200,
        success: true,
        message: "All vegables retrieved successfully",
        data: vegatable,
        pagination: pagi,
      });
    } catch (error) {
      res.status(400).json({
        status: 400,
        success: false,
        message: "Error retrieving vegables",
        error,
      });
    }
  },
  addVegatable: async (req, res) => {
    try {
      const newVegatable = new Vegatable(req.body);
      const savedVegatable = await newVegatable.save();
      res.status(201).json({
        status: 201,
        success: true,
        message: "Vegable added successfully",
        data: savedVegatable,
      });
    } catch (error) {
      res.status(400).json(error);
    }
  },
  updateVegatable: async (req, res) => {
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
        return res
          .status(400)
          .json({ message: "Vui lòng cung cấp đầy đủ thông tin cần thiết." });
      }

      const updateVegatable = await Vegatable.findByIdAndUpdate(
        req.params.id,
        {
          name: req.body.name,
          content: req.body.content,
          price: req.body.price,
          number: req.body.number,
          unit: req.body.unit,
          supplier: req.body.supplier,
          isActive: req.body.isActive,
        }
        // { new: true, runValidators: true }
      );

      if (!updateVegatable) {
        return res.status(404).json({ message: "Người dùng không tồn tại." });
      }

      res.status(200).json({
        status: 200,
        success: true,
        message: "Cập nhật thành công.",
        data: updateVegatable,
      });
    } catch (error) {
      res.status(500).json({
        message: "Đã xảy ra lỗi trong quá trình cập nhật.",
        error: error.message,
        error: error,
      });
    }
  },
  deleteVegatable: async (req, res) => {
    try {
      const deletedVegatable = await Vegatable.findByIdAndDelete(req.params.id);
      if (!deletedVegatable) {
        return res.status(404).json({ message: "Vegable không tồn tại." });
      }
      res.status(200).json({
        status: 200,
        success: true,
        message: "Xóa thành công.",
      });
    } catch (error) {
      return res
        .status(404)
        .json({ message: "Vegable không tồn tại.", error: error.message });
    }
  },
  getDetailVegatable: async (req, res) => {
    try {
      const detail = await Vegatable.findById(req.params.id);
      res.status(200).json({
        status: 200,
        success: true,
        message: "Chi tiết vegatable",
        data: detail,
      });
    } catch (err) {
      res.status(400).json(err);
    }
  },
};
module.exports = VegatableController;
