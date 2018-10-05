const path = require('path');
module.exports = function (app) {

    app.get('/', function (req, res) {
      console.log('HIT THE HOME ROUTE');
      res.sendFile(path.join(__dirname, '../public/index.html'));
    });
  
    app.get('*', function (req, res) {
      res.sendFile(path.join(__dirname, '../public/index.html'));
    });
  };
  