const Product = require("./model");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("reviews").limit(10);
    const apiProducts = products.map((product) => {
      return {
        ...product._doc,
        reviews: {},
        numOfReviews: product.reviews.length,
        averageRating:
          product.reviews.length > 0
            ? product.reviews.reduce((acc, item) => item.rating + acc, 0) /
            product.reviews.length
            : 0,
      };
    });
    res.status(200).json({ products: apiProducts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id)
      .populate("seller")
      .populate({
        path: "reviews",
        populate: {
          path: "user",
          select: ["username", "avatar", "_id"],
        },
        sort: { createdAt: -1 },
      })
      .populate("categories");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    console.log("server product", product);
    const responseProduct = {
      ...product._doc,
      reviews: product.reviews.slice(0, 3),
      numOfReviews: product.reviews.length,
      averageRating:
        product.reviews.length > 0
          ? product.reviews.reduce((acc, item) => item.rating + acc, 0) /
          product.reviews.length
          : 0,
    };
    res.status(200).json({ product: responseProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createProduct = async (req, res) => {
  req.body.seller = req.user._id;
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (
      product.seller.toString() !== req.user._id ||
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this product" });
    }

    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (
      product.seller.toString() !== req.user._id ||
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this product" });
    }

    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const uploadImage = async (req, res) => {
  if (!req.files) {
    return res.status(400).json({ message: "Please upload an image" });
  }
  const image = req.files.image;

  if (!image.mimetype.startsWith("image")) {
    return res.status(400).json({ message: "Please upload an image file" });
  }

  if (image.size > process.env.MAX_FILE_UPLOAD) {
    return res.status(400).json({
      message: `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
    });
  }

  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${productImage.name}`
  );
  await productImage.mv(imagePath);
  res.status(StatusCodes.OK).json({ image: `/uploads/${productImage.name}` });
};

module.exports = {
  getProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
