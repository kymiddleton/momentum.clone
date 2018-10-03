// Require all models
const db = require('../models');

// LOAD DATA: Linking our routes to a series of "data" sources
// const taskList = require('../data/todo_list');

// ROUTING
module.exports = function (app) {

    // GET request: Route for retrieving all items from the database.
    app.get('/api/todo_list', function (req, res) {
        db.todo.find({})
            .then(function (dbtodo) {
                res.json(dbtodo);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    // POST request: Route for saving a new Inventory entry to the database.
    app.post('/api/todo_list', function (req, res) {
        console.log('------Adding to todo in mongo');
        db.todo.create(req.body)
            .then(function (dbtodo) {
                res.json(dbtodo);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    // Route for saving updates 
    app.post('/api/update/todo_list', function (req, res) {
        console.log('----> updating <----');
        // Find an entry by ID 
        db.todo.findOneAndUpdate({ _id: req.body.id }, { $set: { todoStatus: req.body.todoStatus } })
            .then(function (dbtodo) {
                res.json(dbtodo);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    app.post('/api/delete/todo_list', function (req, res) {
        console.log('--------deleting--------');
        db.todo.findByIdAndRemove(req.body.id, function (err, todo) {
            if (err) return res.status(500).send(err);
            // We'll create a simple object to send back with a message and the id of the document that was removed
            // You can really do this however you want, though.
            const response = {
                message: "Todo successfully deleted",
                id: todo._id
            };
            return res.status(200).send(response);
        });
    });
};