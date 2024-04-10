const { faker } = require("@faker-js/faker");
const User = require("./modules/auth/model");
const Category = require("./modules/categories/model");
const Product = require("./modules/products/model");
const Review = require("./modules/reviews/model");

const generateRandomUser = () => {
  return {
    username:
      faker.person.firstName(faker.person.gender()) +
      " " +
      faker.person.lastName(),
    email: faker.internet.email(),
    type: process.env.CLIENT_USER,
    password: faker.internet.password(),
    avatar: faker.image.avatar(),
  };
};

const generateRandomCategory = () => {
  return {
    name: faker.commerce.department(),
    description: faker.commerce.productDescription(),
    image: faker.image.urlLoremFlickr(),
  };
};

const generateRandomProduct = () => {
  return {
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    description: faker.commerce.productDescription(),
    stock: faker.number.int(1, 1000),
    averageRating: 0,
    numOfReviews: 0,
    image: faker.image.urlLoremFlickr(),
    isFeatured: faker.datatype.boolean(),
  };
};

const randomReview = () => {
  return {
    review: faker.lorem.paragraph(),
    rating: faker.number.int({
      min: 1,
      max: 5,
    }),
  };
};

const fillUsers = async (n) => {
  for (let i = 0; i < n; i++) {
    const user = generateRandomUser();
    User.create(user);
  }

};

const fillCategories = async (n) => {
  const categories = [];
  for (let i = 0; i < n; i++) {
    categories.push(generateRandomCategory());
  }
  await Category.insertMany(categories);
};

const fillProducts = async (n) => {
  const products = [];
  const categories = await Category.find();
  const users = await User.find();


  for (let i = 0; i < n; i++) {
    products.push({
      ...generateRandomProduct(),
      categories: [
        categories[faker.number.int(0, 5)]._id,
        categories[faker.number.int(6, categories.length - 1)]._id,
      ],
      seller: users[faker.number.int(0, users.length - 1)]._id,
    });
  }
  await Product.insertMany(products);
};

const fillReviews = async (n) => {
  const products = await Product.find();
  const users = await User.find();

  for (let i = 0; i < n; i++) {
    const review = randomReview();
    review.product = products[faker.number.int(0, products.length - 1)]._id;
    review.user = users[faker.number.int(0, users.length - 1)]._id;
    await Review.create(review);
  }
};
const customProduct = {
  name: "TMA-2HD Wireless",
  image: "https://i.ibb.co/HYqR8Dz/wireless-headphone.png",
  images: [
    "https://i.ibb.co/HYqR8Dz/wireless-headphone.png",
    "https://i.ibb.co/7z3JYkF/wireless-headphone-2.png",
    "https://i.ibb.co/7z3JYkF/wireless-headphone-3.png",
  ],
  price: 200,
  description: "Wireless headphones with high definition sound quality",
  stock: 100,
  averageRating: 0,
  numOfReviews: 0,
  categories: ["65f79c67705f4f59ab448144", "6605e84406ec8343f452f031"],
  seller: "660750a2dd45d6f1af370723",
};


const createProduct = async () => {
  const product = await Product.create(customProduct);
  const review = randomReview();
  // console.log('review', review);
  for (let i = 0; i < 50; i++) {
    review.product = product._id;
    review.user = "660750a2dd45d6f1af370723";
    const apiReview = await Review.create(review);
    console.log('apiReview', apiReview);
    // product.averageRating += apiReview.rating;
    // product.numOfReviews += 1;
  }
  // console.log("product", product);
};



module.exports = {
  fillUsers,
  fillCategories,
  fillProducts,
  fillReviews,
  createProduct,
};

