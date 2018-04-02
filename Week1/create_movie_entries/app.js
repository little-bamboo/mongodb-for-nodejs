var express = require('express'),
    app = express(),
    engines = require('consolidate'),
    MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

var bodyParser = require('body-parser')

app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// create application/json parser
var urlencodedParser = bodyParser.urlencoded({extended: false})

MongoClient.connect('mongodb://localhost:27017/video', function (err, db) {

    assert.equal(null, err);
    console.log("Successfully connected to MongoDB.");

    app.get('/', function (req, res) {

        db.collection('movies').find({}).toArray(function (err, docs) {
            res.render('movies', {'movies': docs});
        });

    });

    app.post('/enter_movie', urlencodedParser, function (req, res, err) {
        console.log('enter movie');

        var collection = db.collection('movie');
        var movie = {};
        movie['title'] = req.body.title;
        movie['year'] = req.body.year;
        movie['imdb'] = req.body.imdb;
        console.log(movie)
        collection.insertOne(movie, {w: 1}, function (err, result) {
            assert.equal(null, err);

            // Fetch the document
            collection.findOne({'title': movie['title']}, function (err, item) {
                assert.equal(null, err);
                assert.equal(movie['title'], item.title);
                res.send('Movie Added: ' + item.title + ' year: ' + item.year + ' imdb: ' + item.imdb);

            })
        });

    });

    app.use(function (req, res) {
        res.sendStatus(404);
    });

    var server = app.listen(3000, function () {
        var port = server.address().port;
        console.log('Express server listening on port %s.', port);
    });

});




