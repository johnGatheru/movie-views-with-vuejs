export default function rateMovie(
  currentRating?: number,
  movieDetails?: any,
  review?: string
) {
  var allMovieRatings = localStorage.getItem("movieRatings");
  let movies = allMovieRatings ? JSON.parse(allMovieRatings) : [];
  let movie = movies.find((movie: any) => movie.id === movieDetails?.imdbID);
  var calculatedRatings = getAverageRatings(movie).toFixed(2);

  if (currentRating !== undefined) {
    if (movie && movie.ratings) {
      movie.ratings.push(currentRating);
    } else if (movie == undefined) {
      let newRating = {
        id: movieDetails.imdbID,
        ratings: [currentRating],
        averageRatings: calculatedRatings,
      };
      movies.push(newRating);
    } else if (movie && movie.ratings == undefined) {
      let obj = {
        ratings: [currentRating],
        averageRatings: calculatedRatings,
      };
      Object.assign(movie, obj);
      movie = obj;
    }
  }

  if (calculatedRatings !== null) {
    if (movie && movie.ratings) {
      movie.averageRatings = calculatedRatings;
    } else {
      var obj1 = {
        averageRatings: calculatedRatings,
      };
      Object.assign(obj1, movie);
    }
  }
  if (review !== "") {
    if (movie && movie.reviews) {
      // console.log("no reviews");
      movie.reviews.push(review);
    } else if (movie == undefined) {
      // console.log("there are reviews");
      let newReview = { id: movieDetails.imdbID, reviews: [review] };
      movies.push(newReview);
    } else if (movie && movie.reviews == undefined) {
      let obj = {
        reviews: [review],
      };
      Object.assign(movie, obj);
      movie = obj;
    }
  }

  localStorage.setItem("movieRatings", JSON.stringify(movies));
  return movies;
}
function getAverageRatings(movie: any) {
  if (movie && movie.ratings) {
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
