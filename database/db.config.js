// "npm start" command will direct to development database
// "npm test" command will direct to test databse

module.exports = {
  mongoURI: {
    development: 'mongodb://localhost/bookAPI',
    test: 'mongodb://localhost/bookAPI-test',
  },
};
