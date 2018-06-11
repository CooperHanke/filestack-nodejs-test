var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// allows us to get jsons from client
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/uploads_mongodb');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('connected to the database!');
});

var uploadSchema = mongoose.Schema({
    friendly_name: String,
    url: String,
    filename: String,
    mimetype: String,
    size: Number,
    date: Date
});

var File = mongoose.model('Upload', uploadSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
  var query = File.find({}).sort({Date: 'desc'}).limit(5);
  query.exec(function (err, docs){
    if (err) { throw err; }
    res.render('index', {uploads: docs} );
  });
});

router.post('/', function(req, res, next) {

  // now to parse this object we get
  var upload = req.body.upload;

  // since we have the things we need, let's see how to connect to a db and make this work out for us
  // connect to the db

  var file = new File({
      url: upload.url,
      friendly_name: upload.friendly_name,
      filename: upload.filename,
      mimetype: upload.mimetype,
      size: upload.size,
      date: new Date()
  });
  file.save(function (err, good) {
    if (err) { return console.error(err); }
    console.log('saved ' + upload.filename + ' to the db');
  });
});


module.exports = router;
