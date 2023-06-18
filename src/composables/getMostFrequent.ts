export default function getFrequentItem() {
  var allSugestions = localStorage.getItem("suggestions");
  if (allSugestions !== undefined) {
    let suggestions = allSugestions ? JSON.parse(allSugestions) : [];
    const stringCount: { [key: string]: number } = {};
    suggestions.forEach((str: any) => {
      if (stringCount[str]) {
        stringCount[str]++;
      } else {
        stringCount[str] = 1;
      }
    });
    let maxCount = 0;
    let mostFrequentString = "";

    for (const str in stringCount) {
      if (stringCount[str] > maxCount) {
        maxCount = stringCount[str];
        mostFrequentString = str;
      }
    }
    return mostFrequentString;
  } else {
    localStorage.setItem("suggestions", JSON.stringify([]));
    return "movie";
  }
}
