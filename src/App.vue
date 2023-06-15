<script setup lang="ts">
import { onMounted, ref, type Ref } from "vue";
import {
  getMovie,
  getByIdorTitle,
  getByTitle,
  getAllGenres,
} from "@/services/fetch";
import { capitalizeFirstLetter } from "@/services/smallServices";
import DropdownInput from "./components/DropdownInput.vue";
import DropDownItem from "./components/DropDownItem.vue";
import InputData from "./components/inputData.vue";
import loader from "./components/loader.vue";
import submitButton from "./components/submitButton.vue";
import singleMovie from "./components/singleMovie.vue";
import { sortMovies } from "./composables/sortMovies";
import StarRating from "./components/starRating.vue";
import rateMovie from "./composables/rateMovies";
import getRatingsFromLocal from "./composables/getRatings";
// let url = "https://www.omdbapi.com/?apikey=5389fe45";
type movie = {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
  averageRatings: string;
  ratings: [string];
  reviews: [string];
};
const movieType = ref();
const sortMovieby = ref();
const genreType = ref();
const yearOfRelease = ref("");
const movieTitle = ref("");
const loading = ref(false);
const movieId = ref(0);
const idToShowTextArea = ref();
const showTextArea = ref(false);
const selectedMovieType = ref("movie");
const types = ref(["movie", "series", "episode"]);
const genre = ref(["drama", "action", "comedy"]);
const sortTypes = ref(["Year", "Title"]);

const movieCreated = ref([]) as Ref<movie[]>;
const toSortMovies = ref();
const singleMovieFilter = ref();
const review = ref("");
async function getAllMovies() {
  movieCreated.value = [];

  loading.value = true;
  let typeMovie = selectedMovieType.value;

  let id = movieId.value;

  let response = await getMovie(typeMovie, id);
  singleMovieFilter.value = null;
  loading.value = false;
  response.Search.forEach((element: any) => {
    getRatingsFromLocal(element);
    movieCreated.value.push(getRatingsFromLocal(element));
    // toSortMovies.value.push(getRatingsFromLocal(element));
  });
  // console.log("mamovie", movieCreated.value);
  // movieCreated.value = response.Search as movie[];
  // toSortMovies.value = response.Search as movie[];
  let toBeRated = JSON.stringify(toSortMovies.value);
  // console.log("movies", toBeRated);
  let ratings = [];
  // toSortMovies.value.forEach((element: any) => {
  //   element.imdbiD;
  // });

  // localStorage.setItem("movie", JSON.stringify(toSortMovies.value));
}
async function getMovieById() {
  let title = movieTitle.value;
  let year = yearOfRelease.value;
  if (year.length || title.length) {
    movieCreated.value = [];
    loading.value = true;
    let movieType = selectedMovieType.value;

    if (year.length) {
      singleMovieFilter.value = null;
      let moviesResponse = await getByIdorTitle(year, title, movieType);
      movieCreated.value = moviesResponse.Search as movie[];
      toSortMovies.value = moviesResponse.Search as movie[];
      loading.value = false;
    } else if (title.length) {
      let singleResponse = await getByTitle(year, title);
      singleMovieFilter.value = singleResponse;
      loading.value = false;
    }
  } else alert("Please enter year or id");
}
async function getGenre(gen: string) {
  genreType.value = gen;
  movieCreated.value = [];
  loading.value = true;
  let theMovies = await getAllGenres(gen);
  loading.value = false;
  movieCreated.value = theMovies.Search as movie[];
  toSortMovies.value = theMovies.Search as movie[];
}
function sortItems(sort: string) {
  let movies = toSortMovies.value;
  sortMovieby.value = sort;
  let sorted = sortMovies(movies, sort);
  movieCreated.value = sorted;
}

onMounted(async () => {
  let allRatings = localStorage.getItem("movieRatings");
  if (allRatings == undefined) {
    localStorage.setItem("movieRatings", JSON.stringify([]));
  }
  await getAllMovies();
});
function addType(item: any) {
  selectedMovieType.value = item;
}
function showReviews(id: any) {
  if (id == idToShowTextArea.value) {
    idToShowTextArea.value = null;
  } else {
    idToShowTextArea.value = id;
    showTextArea.value = true;
  }
}
function checkData(data: any, rate?: number) {
  let currentReview = review.value;
  let ratingResponse = rateMovie(rate, data, currentReview);
  const movie = ratingResponse.find((movie: any) => movie.id === data.imdbID);
  if (movie) {
    movieCreated.value.forEach((element) => {
      if (element.imdbID === movie.id) {
        element.averageRatings = movie.averageRatings;
        element.reviews = movie.reviews;
      }
    });
  }
}
</script>

<template>
  <div class="p-3 bg-slate-900 text-white min-h-screen relative">
    <div class="sticky bg-slate-900 inset-x-0 top-0">
      <h2 class="text-red-600 font-bold">Movie Filter</h2>
      <div class="flex gap-4">
        <div class="flex flex-col">
          <label for="">Movie Type</label>
          <DropdownInput
            placeholder=" select movie type"
            v-model="selectedMovieType"
          >
            <DropDownItem
              v-for="oneType in types"
              :key="oneType"
              @click="addType(oneType)"
              >{{ capitalizeFirstLetter(oneType) }}</DropDownItem
            >
          </DropdownInput>
        </div>
        <div class="flex flex-col">
          <label for="">Select Genre</label>
          <DropdownInput placeholder=" select movie genre" v-model="genreType">
            <DropDownItem
              v-for="gen in genre"
              :key="gen"
              @click="getGenre(gen)"
              >{{ capitalizeFirstLetter(gen) }}</DropDownItem
            >
          </DropdownInput>
        </div>

        <div class="flex flex-col">
          <label for="">Movie Id</label>
          <InputData placeholder="Payback" v-model="movieId" />
        </div>

        <div class="flex flex-col">
          <label for="" class="text-slate-900">t</label>
          <submitButton text="Search Movie" @on-clicked="getAllMovies()" />
        </div>
      </div>
      <div class="flex flex-col max-w-xs">
        <label for="">Sort Movies</label>
        <DropdownInput placeholder=" sort movies" v-model="sortMovieby">
          <DropDownItem
            v-for="sort in sortTypes"
            :key="sort"
            @click="sortItems(sort)"
            >{{ sort }}</DropDownItem
          >
        </DropdownInput>
      </div>
      <div class="flex gap-4">
        <div class="flex flex-col">
          <label for="">Title</label>
          <InputData placeholder="Payback" v-model="movieTitle" />
        </div>
        <div class="flex flex-col">
          <label for="">Year of Release</label>
          <InputData placeholder="2000" v-model="yearOfRelease" />
        </div>
        <div class="flex flex-col">
          <label for="" class="">Search by ID or Year</label>
          <submitButton text="Search " @on-clicked="getMovieById()" />
        </div>
      </div>
    </div>
    <div
      class="grid grid-cols-1 md:grid-cols-4 gap-4 overflow-x-auto mt-3"
      v-if="!singleMovieFilter"
    >
      <div class="" v-for="(item, index) in movieCreated" :key="index">
        <div class="flex flex-col">
          <img :src="item.Poster" alt="" class="w-full h-72 object-cover" />
          <p>{{ item.Title }}</p>
          <h4>Year: {{ item.Year }}</h4>
        </div>
        <div class="flex gap-2 items-center">
          <StarRating
            :rating="item.ratings ? item.ratings[item.ratings?.length - 1] : 0"
            @currentRating="checkData(item, $event)"
          ></StarRating>
          <p class="text-sm items-center" v-if="item.averageRatings">
            Av Rating {{ item.averageRatings }}
          </p>
        </div>
        <button
          class="bg-none outline-none text-xs underline"
          @click="showReviews(item.imdbID)"
        >
          View Reviews
        </button>

        <div
          class="flex flex-col absolute"
          v-if="idToShowTextArea == item.imdbID && showTextArea"
        >
          <div
            class="flex flex-col"
            v-for="review in item.reviews"
            :key="review"
          >
            <p class="bg-gray-700 p-1 mt-1 rounded-lg text-xs">
              {{ review }}
            </p>
          </div>
          <textarea
            name=""
            id=""
            v-model="review"
            class="text-gray-800 text-xs outline-none p-2"
          ></textarea>
          <button
            class="text-xs bg-red-950 rounded-3xl font-bold mt-1 px-[2px]"
            @click="checkData(item)"
          >
            Send Review
          </button>
        </div>
      </div>
    </div>

    <div class="mt-3">
      <singleMovie :movie="singleMovieFilter" v-if="singleMovieFilter" />
    </div>

    <div class="w-full justify-center" v-if="loading"><loader /></div>
  </div>
</template>
