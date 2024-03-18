const { authCheck } = require("../../middleware/authenticate");
const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  getCart,
  removeFromCart
} = require('./controller');
const CartRouter = require('express').Router();


CartRouter.get('/', authCheck, getCart);
CartRouter.post('/', authCheck, addToCart);
CartRouter.patch('/increment', authCheck, incrementQuantity);
CartRouter.patch('/decrement', authCheck, decrementQuantity);
CartRouter.delete('/', authCheck, removeFromCart);

module.exports = CartRouter;