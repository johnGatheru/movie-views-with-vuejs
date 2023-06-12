export default function getRatingsFromLocal(movieItem: any) {
  var allMovieRatings = localStorage.getItem("movieRatings");
  let movies = allMovieRatings ? JSON.parse(allMovieRatings) : [];
  const movie = movies.find((movie: any) => movie.id === movieItem.imdbID);
  let combinedOject = Object.assign(movieItem, movie);
  // console.log("combination all", combinedOject);
  return combinedOject;
}
