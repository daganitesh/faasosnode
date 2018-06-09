var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost/faasos';

/* GET users listing. */
router.get('/', function(req, res, next) {
  MongoClient.connect(url, function(err, database) {
      const db = database.db('faasos',{ safe: true }, { auto_reconnect: true })
      var cursor = db.collection('order').find().toArray(function (err, items) {
        res.send(items);
    });
  }); 
});


router.route('/add').post(function (req, res) {
  MongoClient.connect(url, function(err, database) {
    const db = database.db('faasos',{ safe: true }, { auto_reconnect: true })
    db.collection('order').insertOne(req.body);
    var cursor = db.collection('order').find().toArray(function (err, items) {
      res.send(items);
    })
  }); 
});

module.exports = router;
