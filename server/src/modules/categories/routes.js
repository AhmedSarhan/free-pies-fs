const { authorizeRoles } = require("../../middleware/permissions");
const {
  createCategory,
  deleteCategory,
  getCategory,
  getCategories,
  updateCategory
} = require('./controller');
const CategoriesRouter = require('express').Router();


CategoriesRouter.get('/', getCategories);
CategoriesRouter.get('/:id', getCategory);
CategoriesRouter.post('/', authorizeRoles('admin'), createCategory);
CategoriesRouter.patch('/:id', authorizeRoles('admin'), updateCategory);
CategoriesRouter.delete('/:id', authorizeRoles('admin'), deleteCategory);


module.exports = CategoriesRouter;