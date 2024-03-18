const { authCheck } = require("../../middleware/authenticate");
const {
  createProduct,
  deleteProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  uploadImage
} = require('./controller');
const ProductsRouter = require('express').Router();


ProductsRouter.get('/', getProducts);
ProductsRouter.get('/:id', getSingleProduct);
ProductsRouter.post('/', authCheck, createProduct);
ProductsRouter.patch('/:id', authCheck, updateProduct);
ProductsRouter.delete('/:id', authCheck, deleteProduct);
ProductsRouter.post('/upload', authCheck, uploadImage);



module.exports = ProductsRouter;