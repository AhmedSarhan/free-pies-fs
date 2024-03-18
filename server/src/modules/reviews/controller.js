const Review = require("./model");

const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({}).populate("user");
    res.status(200).json({ reviews });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getReview = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findById(id).populate("user");
    res.status(200).json({ review });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createReview = async (req, res) => {
  req.body.user = req.user._id;
  try {
    const review = await Review.create(req.body);
    res.status(201).json({ review });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateReview = async (req, res) => {
  try {
    const { id } = req.params;

    if (product.user.toString() !== req.user._id || req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this product" });
    }

    const review = await Review.findByIdAndUpdate(id, req.body);
    res.status(200).json({ review });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    if (product.user.toString() !== req.user._id || req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this product" });
    }
    await Review.findByIdAndDelete(id);
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
};
