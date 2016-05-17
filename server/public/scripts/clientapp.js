$(document).ready(function () {
  getMovies();
//submit the form/ add a movie

$('#submit').on('click', postMovie);
});

function getMovies() {
  $.ajax({
    type: 'GET',
    url: '/movies',
    success: function(movies) {
      movies.forEach(function (movie) {
        $('#movieList').append('<div>' + movie.title + '|' + movie.year + '|' +
        movie.genre + '|' + movie.director + '</div>');
      });
    }
  });
}

function postMovie () {
  event.preventDefault();
  var movie = {};
  //get the name from your field and set it equal to the value of the field
  $.each($('#movieForm').serializeArray(), function(i, field) {
    movie[field.name] = field.value;
  });
//posting data to /movies which is connected in app.js
  $.ajax ({
    type: 'POST',
    url: '/movies',
    data: movie,
    success: function (data) {
      console.log('good stuff');
    }
  });
}
