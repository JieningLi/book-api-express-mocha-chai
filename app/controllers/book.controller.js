/* eslint-disable no-param-reassign */

const Book = require('../models/book.model.js');

// Retrieve and return all books from database.
exports.findAll = (req, res) => {
  Book.find()
    .then((books) => {
      res.send(books);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving books.',
      });
    });
};

// Create and Save a new book
exports.create = (req, res) => {
  const book = new Book(req.body);
  book
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Book.',
      });
    });
};

// Find a single book with a bookId
exports.findOne = (req, res) => {
  Book.findById(req.params.bookId)
    .then((book) => {
      if (!book) {
        res.status(404).send({
          message: `Booooooook with id ${req.params.bookId} not found`,
        });
      }
      res.send(book);
    })
    .catch(() => {
      res.status(500).send({
        message: `Error retrieving book with id ${req.params.bookId}`,
      });
    });
};

// Update a book identified by the bookId in the request
exports.update = (req, res) => {
  Book.findByIdAndUpdate(req.params.bookId, req.body, {
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Can not update book with id ${req.params.bookId}`,
        });
      }
      res.send(data);
    })
    .catch(() => {
      res.status(500).send({
        message: `Error updating book with id ${req.params.bookId}`,
      });
    });
};

// Delete a book with the specified bookId in the request
exports.delete = (req, res) => {
  Book.findByIdAndRemove(req.params.bookId)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete book with id ${req.params.bookId}.`,
        });
      }
      res.send(data);
    })
    .catch(() => {
      res.status(500).send({
        message: `Cannot delete book with id ${req.params.bookId}.`,
      });
    });
};
