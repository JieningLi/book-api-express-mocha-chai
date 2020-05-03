/* eslint-env mocha */
process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app.js');
const Book = require('../app/models/book.model.js');

const should = chai.should();
chai.use(chaiHttp);

describe('Book API', () => {
  beforeEach((done) => {
    const book = new Book({
      read: false,
      title: 'Test book title',
      genre: 'Test genre',
      author: 'Test author',
    });
    book.save(() => {
      done();
    });
  });
  afterEach((done) => {
    Book.collection.drop();
    done();
  });

  describe('GET /api/books', () => {
    it('it should list all the books on api/books', (done) => {
      chai
        .request(app)
        .get('/api/books')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body[0].should.have.property('_id');
          res.body[0].should.have.property('title');
          res.body[0].should.have.property('author');
          res.body[0].should.have.property('genre');
          res.body[0].should.have.property('read');
          res.body[0].title.should.equal('Test book title');
          res.body[0].author.should.equal('Test author');
          res.body[0].genre.should.equal('Test genre');
          res.body[0].read.should.equal(false);
          done();
        });
    });
  });

  describe('GET /api/books/bookId', () => {
    it('it should list single book on api/books/bookId', (done) => {
      const newBook = new Book({
        read: false,
        title: 'Test book title new',
        genre: 'Test genre new',
        author: 'Test author new',
      });
      newBook.save((err, data) => {
        chai
          .request(app)
          .get(`/api/books/${data.id}`)
          .end((error, res) => {
            res.should.have.status(200);
            res.body.should.have.property('_id');
            res.body.should.have.property('title');
            res.body.should.have.property('author');
            res.body.should.have.property('genre');
            res.body.should.have.property('read');
            res.body.title.should.equal('Test book title new');
            res.body.author.should.equal('Test author new');
            res.body.genre.should.equal('Test genre new');
            res.body.read.should.equal(false);
            done();
          });
      });
    });
  });

  describe('POST /api/books', () => {
    it('it should add single book on api/books', (done) => {
      chai
        .request(app)
        .post('/api/books')
        .send({
          read: false,
          title: 'Test book title new',
          genre: 'Test genre new',
          author: 'Test author new',
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('_id');
          res.body.should.have.property('title');
          res.body.should.have.property('author');
          res.body.should.have.property('genre');
          res.body.should.have.property('read');
          res.body.title.should.equal('Test book title new');
          res.body.author.should.equal('Test author new');
          res.body.genre.should.equal('Test genre new');
          res.body.read.should.equal(false);
          done();
        });
    });
  });

  describe('PUT /api/books/bookId', () => {
    it('should update a single book on /api/books/bookId PUT', (done) => {
      chai
        .request(app)
        .get('/api/books')
        .end((err, res) => {
          chai
            .request(app)
            .put(`/api/books/${res.body[0]._id}`)
            .send({
              read: false,
              title: 'Test book title new',
              genre: 'Test genre new',
              author: 'Test author new',
            })
            .end((error, response) => {
              response.should.have.status(200);
              response.body.should.be.a('object');
              response.body.should.have.property('author');
              response.body.should.have.property('_id');
              response.body.should.have.property('title');
              response.body.should.have.property('genre');
              response.body.should.have.property('read');
              response.body.read.should.equal(false);
              response.body.title.should.equal('Test book title new');
              response.body.genre.should.equal('Test genre new');
              response.body.author.should.equal('Test author new');
              done();
            });
        });
    });
  });

  describe('DELETE /api/books/bookId', () => {
    it('should delete a single book on /api/books/bookId PUT', (done) => {
      chai
        .request(app)
        .get('/api/books')
        .end((err, res) => {
          chai
            .request(app)
            .delete(`/api/books/${res.body[0]._id}`)
            .end((error, response) => {
              response.should.have.status(200);
              done();
            });
        });
    });
  });
});
