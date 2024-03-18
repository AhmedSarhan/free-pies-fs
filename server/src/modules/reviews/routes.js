const { authCheck } = require("../../middleware/authenticate");
const {
  createReview,
  deleteReview,
  getReview,
  getReviews,
  updateReview,
} = require('./controller');
const ReviewsRouter = require('express').Router();

ReviewsRouter.get('/', getReviews);
ReviewsRouter.get('/:id', getReview);
ReviewsRouter.post('/', authCheck, createReview);
ReviewsRouter.patch('/:id', authCheck, updateReview);
ReviewsRouter.delete('/:id', authCheck, deleteReview);



module.exports = ReviewsRouter;