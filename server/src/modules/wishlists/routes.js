const { addToWishlist, getWishlist, removeFromWishlist } = require('./controller');
const { authCheck } = require("../../middleware/authenticate");

const WishlistRouter = require('express').Router();

WishlistRouter.get('/', authCheck, getWishlist);
WishlistRouter.post('/', authCheck, addToWishlist);
WishlistRouter.delete('/', authCheck, removeFromWishlist);

module.exports = WishlistRouter;