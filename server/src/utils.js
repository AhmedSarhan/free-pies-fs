const { faker } = require("@faker-js/faker");
const User = require("./modules/auth/model");
const Category = require("./modules/categories/model");
const Product = require("./modules/products/model");

const generateRandomUser = () => {
  return {
    username:
      faker.person.firstName(faker.person.gender()) +
      " " +
      faker.person.lastName(),
    email: faker.internet.email(),
    type: process.env.CLIENT_USER,
    password: faker.internet.password(),
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
    averageRating: faker.number.int(1, 5),
    numOfReviews: faker.number.int(1, 200),
    image: faker.image.urlLoremFlickr(),
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

module.exports = {
  fillUsers,
  fillCategories,
  fillProducts,
};
