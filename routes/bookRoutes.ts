import express from 'express';
import {
    getBook,
    saveBook,
    deleteBook,
    getBooksBySearch,
} from  './../controllers/bookController'

const bookRouter = express.Router();

bookRouter
    .route('/:Query')
    .get(getBooksBySearch)

    bookRouter
    .route('/:id')
    .get(getBook)
    .post(saveBook)
    .delete(deleteBook);

export default bookRouter;