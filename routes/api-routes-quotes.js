// Require all models
const db = require('../models');

// ROUTING
module.exports = function (app) {

    // GET request: Route for retrieving quotes from the database.
    app.get('/api/quotesLog', function (req, res) {
        // console.log('-------inspirational quote----------');
        // console.log(req.body)
        db.quote.find()
            .then(function (dbquote) {
                res.json(dbquote);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    // POST request: Route for creating new content, adding a new quote entry to the database.
    app.post('/api/quotesLog', function (req, res) {
        console.log('------Adding quote in mongo');
        db.quote.create(req.body)
            .then(function (dbquote) {
                res.json(dbquote);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    // Using a PUT route to pass in the quoteDate (can't make GET route use a req.body?)
    app.put('/api/quotesLog', function (req, res) {
        console.log('-------"put" inspirational quote----------');
        db.quote.find({quoteDate:req.body.quoteDate})
            .then(function (dbquote) {
                res.json(dbquote);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

};