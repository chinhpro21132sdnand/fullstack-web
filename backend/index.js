const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const { default: mongoose } = require("mongoose");
const authRoute = require("./routes/auth");

const User = require("./routes/user");
const Vegatable = require("./routes/vegatable");
const cacbonatedDrink = require("./routes/drink/cacbonatedrink");
const middlewareController = require("./controllers/middleware");
const ancolDrink = require("./routes/drink/ancoldrink");
const coffeDrink = require("./routes/drink/coffedrink");
const noodle = require("./routes/InstantFood/noodle");
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

app.use("/v1/", Vegatable);

app.use("/v1/", cacbonatedDrink);

app.use("/v1/", ancolDrink);

app.use("/v1", coffeDrink);

app.use("/v1", noodle);
app.listen(8000, () => {
  console.log("listening on");
});
