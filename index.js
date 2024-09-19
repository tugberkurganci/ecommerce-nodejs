const express = require("express");
const app = express();
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const orderRoute = require("./routes/order");
const cors = require("cors");
const {connectToDatabase }= require('./config/connectDatabase');
const { verifyToken } = require("./services/authService");
const errorHandler=require("./middlewares/errorHandler")



dotenv.config();
connectToDatabase();


app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use(verifyToken)
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);
app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
  app.listen(process.env.PORT || 5000, () => {
    console.log("Backend server is running!");
  });
}
module.exports = app;