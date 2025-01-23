const User = require("../models/User");

const UserController = {
  //Register
  getAllUser: async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(400).json(error);
    }
  },
};

module.exports = UserController;
