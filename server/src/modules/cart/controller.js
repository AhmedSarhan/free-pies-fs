const Cart = require("./model");


const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate("products.product");
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addToCart = async (req, res) => {
  try {
    const { product, quantity } = req.body;
    const cart = await Cart.findOne({ user: req.user._id });
    const productIndex = cart.products.findIndex(p => p.product == product);
    if (productIndex > -1) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ product, quantity });
    }
    cart.total += quantity * product.price;
    await cart.save();
    res.status(200).json(cart);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const incrementQuantity = async (req, res) => {
  try {
    const { product } = req.body;
    const cart = await Cart.findOne({ user: req.user._id });
    const productIndex = cart.products.findIndex(p => p.product == product);
    if (productIndex <= -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }
    cart.products[productIndex].quantity++;
    cart.total += cart.products[productIndex].product.price;
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const decrementQuantity = async (req, res) => {
  try {
    const { product } = req.body;
    const cart = await Cart.findOne({ user: req.user._id });
    const productIndex = cart.products.findIndex(p => p.product == product);
    if (productIndex <= -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }
    cart.products[productIndex].quantity--;
    cart.total -= cart.products[productIndex].product.price;
    if (cart.products[productIndex].quantity < 1) {
      cart.products.splice(productIndex, 1);
    }
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { product } = req.body;
    const cart = await Cart.findOne({ user: req.user._id });
    const productIndex = cart.products.findIndex(p => p.product == product);
    if (productIndex > -1) {
      cart.total -= cart.products[productIndex].quantity * cart.products[productIndex].product.price;
      cart.products.splice(productIndex, 1);
      await cart.save();
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
};