var express = require('express');
var router = express.Router();
var pg =require('pg');
var connectionString = 'postgress://localhost:5432/mu';

router.get('/', function (req, res) {
  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      //500 is an error status
      res.sendStatus(500)
    }
    client.query('SELECT * FROM movies', function(err, result) {
      done();


    });
  });
});

router.post('/', function(req, res) {
  //object from the forms in the body
  var movie = req.body;
  console.log(movie);
  //connecting to the server
  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      //500 is an error status
      console.log('err in connect');
      res.sendStatus(500);
    }
    //making a query and storing the movie object in the table
    client.query('INSERT INTO movies (title, year, genre, director) ' +
                  'VALUES ($1, $2, $3, $4)',
                  [movie.title, movie.year, movie.genre, movie.director],
                  //function to do stuff with the data
                  function(err, result) {
                    //tells pg we no longer need connection
                    done();
                    if (err) {
                      console.log('err in query');
                      res.sendStatus(500);
                      return;
                    }
                    //201 is a success status
                    res.sendStatus(201);
                  });
  });

});

module.exports = router;
