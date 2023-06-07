export function sortMovies(movies: any, byWhat: string) {
  if (byWhat == "Year") {
    const sortByYear = (a: any, b: any) => a.Year - b.Year;
    const sortedByYear = movies.sort(sortByYear);
    return sortedByYear;
  } else if (byWhat == "Title") {
    // Sort by name
    const sortByName = (a: any, b: any) => a.Title.localeCompare(b.Title);
    const sortedByName = movies.sort(sortByName);
    return sortedByName;
  }
}
