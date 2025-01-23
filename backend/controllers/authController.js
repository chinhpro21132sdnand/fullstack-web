const User = require("../models/User");
const bcrypt = require("bcrypt");

const authController = {
  //Register
  registerUser: async (req, res) => {
    ZA;
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const newUser = await new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });

      //save to DB
      const user = await newUser.save();
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  LoginUser: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) return res.status(404).json({ message: "User not found" });
      const valiPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!valiPassword) {
        res.status(401).json({ message: "Invalid Pa xssazKJNKJJJJJJssword" });
      }
      if (valiPassword && user) {
        res.status(201).json(user);
      }
    } catch (error) {
      res.status(400);
    }
  },
};

module.exports = authController;
