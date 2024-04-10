const express = require("express");
const morgan = require("morgan");
const connectDb = require("./db/connect-db");
const AuthRouter = require("./modules/auth/routes");
const ProductsRouter = require("./modules/products/routes");
const ReviewsRouter = require("./modules/reviews/routes");
const CartRouter = require("./modules/cart/routes");
const CategoriesRouter = require("./modules/categories/routes");
const WhishlistRouter = require("./modules/wishlists/routes");
// const OrdersRouter = require("./modules/orders/routes");
const debug = require("debug")("app:server");
require("dotenv").config();
const cors = require("cors");
const { fillUsers, fillCategories, fillProducts, fillReviews, createProduct } = require("./utils");

const app = express();

app.use(express.json());
morgan('tiny');

const PORT = process.env.PORT || 3030;
const MONGO_URI = process.env.MONGO_URI;
const whitelist = [process.env.TEST_CLIENT, process.env.DEV_CLIENT];
const corsOptions =
  process.env.NODE_ENV === "dev"
    ? null
    : {
      origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
    };

app.use("/auth", cors(corsOptions), AuthRouter);
app.use("/cart", cors(corsOptions), CartRouter);
app.use("/categories", cors(corsOptions), CategoriesRouter);
app.use("/products", cors(corsOptions), ProductsRouter);
app.use("/reviews", cors(corsOptions), ReviewsRouter);
app.use("/whishlist", cors(corsOptions), WhishlistRouter);

// app.use('orders', cors(corsOptions), OrdersRouter);
debug("Creating Express application");

const start = async () => {
  try {
    await connectDb(MONGO_URI);
    // await fillUsers(10);
    // await fillCategories(10);
    // await fillProducts(50);
    // await fillReviews(100);
    // await createProduct();
    app.listen(PORT, () => {
      console.log("Server is listening on port " + PORT);
    });
  } catch (err) {
    debug("Creating Express application");

    console.error(err);
  }
};

start();
