import express from 'express';
import {
    getAllReviews,
    getReview,
    createReview,
    updateReview,
    deleteReview,
} from  './../controllers/reviewController'

const reviewRouter = express.Router();

reviewRouter
    .route('/')
    .get(getAllReviews)
    .post(createReview)
    reviewRouter
    .route('/:id')
    .get(getReview)
    .patch(updateReview)
    .delete(deleteReview);

export default reviewRouter;