// Require all models
const db = require('../models');

// ROUTING
module.exports = function (app) {

    // GET request: Route for retrieving todo from the database.
    app.get('/api/todoLog', function (req, res) { //Works
        console.log('--------retrieving---------');
        db.todo.find({})
            .then(function (dbtodo) {
                res.json(dbtodo);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    // POST request: Route for creating new content, adding a new todo entry to the database.
    app.post('/api/todoLog', function (req, res) { //Works
        console.log('------Adding to todo in mongo');
        db.todo.create(req.body)
            .then(function (dbtodo) {
                res.json(dbtodo);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    // PUT request: Route for updating todo content / saving updates 
    app.put('/api/todoLog', function (req, res) { //Works
        console.log('----> updating <----');        
        db.todo.findOneAndUpdate({ _id: req.body.id }, { $set: { todoItem: req.body.todoItem, todoStatus: req.body.todoStatus } })
            .then(function (dbtodo) {
                res.json(dbtodo);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    // DELETE request: Deletes link content
    app.delete('/api/todoLog', function (req, res) { //Works
        console.log('--------deleting--------');
        db.todo.findByIdAndRemove(req.body.id, function (err, todo) {
            if (err) return res.status(500).send(err);
            // We'll create a simple object to send back with a message and the id of the document that was removed

            const response = {
                message: "Todo successfully deleted",
                id: todo._id
            };
            return res.status(200).send(response);
        });
    });
};
