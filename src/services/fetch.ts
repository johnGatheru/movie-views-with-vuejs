import { ref } from "vue";
let baseUrl = import.meta.env.VITE_BASE_URL;
let apikey = import.meta.env.VITE_API_KEY;
let url = `${baseUrl}apikey=${apikey}`;

export async function getMovie(movieType: string, id: number) {
  const movieCreated = ref();
  const error = ref();

  await fetch(`${url}&s=${movieType}&i=${id}`)
    .then((res) => res.json())
    .then((json) => (movieCreated.value = json))
    .catch((err) => (error.value = err));
  return movieCreated.value;
}
export async function getByIdorTitle(
  year: any,
  title: string,
  movieType: string
) {
  const movieCreated = ref();
  const error = ref();

  await fetch(`${url}&y=${year}&t=${title}&s=${movieType}`)
    .then((res) => res.json())
    .then((json) => (movieCreated.value = json))
    .catch((err) => (error.value = err));
  return movieCreated.value;
}
export async function getByTitle(year: any, title: string) {
  const movieCreated = ref();
  const error = ref();

  await fetch(`${url}&y=${year}&t=${title}`)
    .then((res) => res.json())
    .then((json) => (movieCreated.value = json))
    .catch((err) => (error.value = err));
  return movieCreated.value;
}
export async function getAllGenres(gen: string) {
  const movieCreated = ref();
  const error = ref();

  await fetch(`${url}&s=${gen}`)
    .then((res) => res.json())
    .then((json) => (movieCreated.value = json))
    .catch((err) => (error.value = err));
  return movieCreated.value;
}
// let { data: contacts, pending: refreshContacts } = await useFetch(
//   `${BACKEND_SERVICE}/contacts/list`,
//   {
//     method: "GET",
//     params: { organizationId: orgId.value },
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   }
// );
