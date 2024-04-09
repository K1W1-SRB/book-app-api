import express from 'express';
import {
    allBooksInCase,
    createBookCase,
    getBookCases,
    getBook,
    removeBook,
    getMyBookCase,
    getMyBookCases
} from  './../controllers/bookCaseController'

const bookCaseRouter = express.Router();

bookCaseRouter
    .route('/')
    .get(getBookCases)
    .post(createBookCase)
    
    bookCaseRouter.route('/:id/books')
    .get(allBooksInCase)

    bookCaseRouter.route('/:userId').get(getMyBookCases)

    bookCaseRouter.route('/:userId/:id')
    .get(getMyBookCase)
    
    
    bookCaseRouter.route('/:id/books/:bookId')
    .get(getBook)
    .delete(removeBook);

export default bookCaseRouter;