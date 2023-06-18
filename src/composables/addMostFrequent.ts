export default function addSelection(item: any) {
  var allSuggestions = localStorage.getItem("suggestions");

  let mySuggestions = allSuggestions ? JSON.parse(allSuggestions) : [];
  mySuggestions.push(item);
  localStorage.setItem("suggestions", JSON.stringify(mySuggestions));
  return mySuggestions;
}
