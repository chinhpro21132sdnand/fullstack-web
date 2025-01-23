const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const { default: mongoose } = require("mongoose");
const authRoute = require("./routes/auth");

const User = require("./routes/user");
dotenv.config();
const app = express();

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
  }
};

// Gọi hàm kết nối
connectToDB();
app.use(cors());
app.use(cookieParser());
app.use(express.json());

//ROUTES
app.use("/v1/auth", authRoute);

app.use("/v1/users", User);

app.listen(8000, () => {
  console.log("listening on");
});
