// Require all models
const db = require('../models');

// ROUTING
module.exports = function (app) {

    // GET request: Route for retrieving links from the database.
    app.get('/api/linksLog', function (req, res) { //Works
        db.links.find({})
            .then(function (dblinks) {
                res.json(dblinks);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    // POST request: Route for creating new content, adding a new Link entry to the database.
    app.post('/api/linksLog', function (req, res) {  //working
        console.log('------Adding Link in mongo');
        db.links.create(req.body)
            .then(function (dblinks) {
                res.json(dblinks);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    // PUT request: Route for updating link content / saving updates 
    app.put('/api/linksLog', function (req, res) { //Works!
        console.log('----> updating <----');
        db.links.findOneAndUpdate({ _id: req.body.id }, { $set: { url: req.body.url, linkName: req.body.linkName } })
            .then(function (dblinks) {
                res.json(dblinks);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    // DELETE request: Deletes link content
    app.delete('/api/linksLog/:link_id', function (req, res) {  //works!
        console.log('--------deleting--------');
        db.links.findByIdAndRemove(req.params.link_id, function (err, links) {
            if (err) return res.status(500).send(err);
            // We'll create a simple object to send back with a message and the id of the document that was removed
            const response = {
                message: "Link successfully deleted",
                id: links._id
            };
            return res.status(200).send(response);
        });
    });
};