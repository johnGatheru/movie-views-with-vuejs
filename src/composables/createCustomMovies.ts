export default function addListToLocal(list: any) {
  var allMovieCustom = localStorage.getItem("customList");
  let customMovies = allMovieCustom ? JSON.parse(allMovieCustom) : [];
  customMovies.push(list);
  localStorage.setItem("customList", JSON.stringify(customMovies));
  return customMovies;
}
