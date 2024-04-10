const { authCheck } = require("../../middleware/authenticate");
const {
  createReview,
  deleteReview,
  getReview,
  getReviews,
  getProductReviews,
  updateReview,
} = require('./controller');
const ReviewsRouter = require('express').Router();

ReviewsRouter.get('/', getReviews);
ReviewsRouter.get('/:id', getReview);
ReviewsRouter.get('/product/:id', getProductReviews);
ReviewsRouter.post('/', authCheck, createReview);
ReviewsRouter.patch('/:id', authCheck, updateReview);
ReviewsRouter.delete('/:id', authCheck, deleteReview);


module.exports = ReviewsRouter;