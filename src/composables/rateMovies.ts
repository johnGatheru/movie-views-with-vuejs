export default function rateMovie(currentRating: number, movieId: string) {
  var allMovieRatings = localStorage.getItem("movieRatings");
  let movies = allMovieRatings ? JSON.parse(allMovieRatings) : [];

  const movie = movies.find((movie: any) => movie.id === movieId);
  if (movie) {
    movie.ratings.push(currentRating);
  } else {
    let newRating = { id: movieId, ratings: [currentRating] };
    movies.push(newRating);
  }
  var calculatedRatings = getAverageRatings(movie).toFixed(2);

  if (movie && movie.ratings.length > 0) {
    movie.averageRatings = calculatedRatings;
  } else {
    var obj1 = {
      averageRatings: calculatedRatings,
    };
    Object.assign(obj1, movie);
  }

  localStorage.setItem("movieRatings", JSON.stringify(movies));
  return movies;
}
function getAverageRatings(movie: any) {
  if (movie && movie.ratings.length > 0) {
    console.log("there is ratings ");
    const sum = movie.ratings.reduce(
      (acc: any, rating: any) => acc + rating,
      0
    );
    const average = sum / movie.ratings.length;
    return average;
  } else {
    return 1;
  }
}
