const coffeDrinkSchema = require("../../models/drink/coffedrink");
const pagination = require("../../common/pagination");
const coffeDrink = {
  getAllcoffeDrink: async (req, res) => {
    try {
      const { current, page } = req.query;
      const pagi = pagination(
        parseInt(current),
        parseInt(page),
        coffeDrinkSchema
      );
      const allCoffeDrink = await coffeDrinkSchema
        .find()
        .limit(page)
        .skip(pagi.skip);
      if (!allCoffeDrink) {
        return res.status(404).json({ message: "No coffe drink found" });
      }
      res.status(200).json({
        status: 200,
        message: "successfully",
        data: allCoffeDrink,
        pagination: pagi,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  addcoffeDrink: async (req, res) => {
    try {
      const payload = new coffeDrinkSchema(req.body);

      const savedCoffeDrink = await payload.save();

      if (!savedCoffeDrink) {
        return res.status(400).json({ message: "Failed to add coffe drink" });
      }
      res.status(201).json({
        message: "Coffe drink added successfully",
        data: savedCoffeDrink,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  getDetailcoffeDrink: async (req, res) => {
    try {
      if (!req.params.id) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      const coffeDrink = await coffeDrinkSchema.findById(req.params.id);
      if (!coffeDrink) {
        return res.status(404).json({ message: "Coffe drink not found" });
      }
      res.status(200).json({ message: "Coffe drink found", data: coffeDrink });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  UpdateCoffeDrink: async (req, res) => {
    try {
      const { name, content, price, number, unit, supplier, isActive } =
        req.body;
      if (!req.params.id) {
        res.status(404).json({ message: "Please provide id" });
      }

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
        const updateCoffeDrink = await coffeDrinkSchema.findByIdAndUpdate(
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
        if (!updateCoffeDrink) {
          return res
            .status(404)
            .json({ message: "Coffe drink not found or update failed" });
        }
        res.status(200).json({
          message: "Coffe drink updated successfully",
        });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  deleteCoffeDrink: async (req, res) => {
    try {
      if (!req.params.id) {
        return res.status(404).json({ message: "Please provide id" });
      }
      const delletedCoffe = await coffeDrinkSchema.findByIdAndDelete(
        req.params.id
      );
      if (!delletedCoffe) {
        return res.status(404).json({ message: "Coffe drink not found" });
      }
      res.status(200).json({ message: "Coffe drink deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = coffeDrink;
