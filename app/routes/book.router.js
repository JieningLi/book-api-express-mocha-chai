const express = require('express');
const books = require('../controllers/book.controller.js');

const bookRouter = express.Router();

bookRouter.get('/books', books.findAll);
bookRouter.get('/books/:bookId', books.findOne);
bookRouter.post('/books', books.create);
bookRouter.put('/books/:bookId', books.update);
bookRouter.delete('/books/:bookId', books.delete);

module.exports = bookRouter;
