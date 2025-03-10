const noodleSchema = require("../../models/InstantFood/noodles");
const pagination = require("../../common/pagination");
const noodleController = {
  getAllnoodle: async (req, res) => {
    try {
      const { current, page } = req.params;
      const { name, content, price, unit, number, supplier, isActive } =
        req.body;
      const pagi = await pagination(
        parseInt(current),
        parseInt(page),
        noodleSchema
      );

      const dataNoodle = await noodleSchema.find().limit(page).skip(pagi.skip);
      if (!dataNoodle) {
        return res.status(404).json({
          status: 404,
          message: "No noodle found",
        });
      }
      res.status(200).json({
        status: 200,
        message: "Get all noodle successfully",
        data: dataNoodle,
        pagination: pagi,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  addNoodle: async (req, res) => {
    try {
      const {
        name,
        content,
        price,
        unit,
        isActive,
        supplier,
        number,
        dateto,
        datefrom,
      } = req.body;
      if (!name || !content || !price || !unit || !supplier || !number) {
        return res.status(400).json({
          status: 400,
          message: "Please provide all required fields",
        });
      } else {
        const newNoodle = new noodleSchema({
          name,
          content,
          price,
          unit,
          isActive,
          supplier,
          number,
          dateto,
          datefrom,
        });
        const addNoodle = await newNoodle.save();
        if (!addNoodle) {
          res.status(400).json({
            message: "add fail",
          });
        }
        res.status(200).json({
          status: 200,
          message: "Add noodle successfully",
          data: addNoodle,
        });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  detailNoodle: async (req, res) => {
    try {
      const noodle = await noodleSchema.findById(req.params.id);
      if (!noodle) {
        return res.status(404).json({
          status: 404,
          message: "No noodle found",
        });
      }
      res.status(200).json({
        status: 200,
        message: "Get noodle detail successfully",
        data: noodle,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  updateNoodle: async (req, res) => {
    try {
      const {
        name,
        content,
        price,
        unit,
        isActive,
        supplier,
        number,
        dateto,
        datefrom,
      } = req.body;
      if (!name || !content || !price || !unit || !supplier || !number) {
        return res.status(400).json({
          status: 400,
          message: "Please provide all required fields",
        });
      } else {
        const newNoodle = new noodleSchema({
          name,
          content,
          price,
          unit,
          isActive,
          supplier,
          number,
        });
        const addNoodle = await newNoodle.findByIdandUpdate(req.params.id, {
          newNoodle,
        });
        if (!addNoodle) {
          res.status(400).json({
            message: "add fail",
          });
        }
        res.status(200).json({
          status: 200,
          message: "Add noodle successfully",
          data: addNoodle,
        });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  delletedNoodle: async (req, res) => {
    try {
      const deletedNoodle = await noodleSchema.findByIdAndDelete(req.params.id);
      if (!deletedNoodle) {
        res.status(404).json({
          status: 404,
          message: "Noodle not found",
        });
      }
      res.status(200).json({
        status: 200,
        message: "Noodle deleted successfully",
        data: deletedNoodle,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = noodleController;
