<script setup lang="ts">
import { ref } from "vue";
import { capitalizeFirstLetter } from "@/services/smallServices";

defineProps<{
  movieList?: list;
}>();
const idToShowTextArea = ref();
const showTextArea = ref(false);
type list = {
  listName: string;
  movieList: [
    {
      Poster: string | undefined;
      Year: string;
      imdbID: string;
      Title: string;
      reviews: [];
      ratings: [];
      id: string;
      averageRatings: string;
    }
  ];
};
function showReviews(item: any) {
  idToShowTextArea.value = item;
  showTextArea.value = !showTextArea.value;
}
</script>
<template>
  <div class="px-1 mt-1 bg-slate-800">
    <div class="">
      <label for="" class="underline text-orange-800 font-bold text-sm"
        >List Title</label
      >
      <p>{{ capitalizeFirstLetter(movieList?.listName) }}</p>
    </div>
    <div class="flex flex-wrap w-full gap-3">
      <div class="" v-for="(item, index) in movieList?.movieList" :key="index">
        <div class="">
          <div class="flex flex-col">
            <img :src="item.Poster" alt="" class="w-full h-72 object-cover" />
            <p>{{ item.Title }}</p>
            <h4>Year: {{ item.Year }}</h4>
          </div>
          <div class="flex gap-2 items-center"></div>
          <button
            class="bg-none outline-none text-xs underline"
            @click="showReviews(item.imdbID)"
          >
            View Reviews
          </button>

          <div
            class="flex flex-col absolute bg-slate-800 px-2"
            v-if="idToShowTextArea == item.imdbID && showTextArea"
          >
            <div class="text-sm text-orange-900" v-if="!item.reviews?.length">
              No review yet
            </div>
            <div
              class="flex flex-col"
              v-for="review in item.reviews"
              :key="review"
            >
              <p class="bg-gray-700 p-1 mt-1 rounded-lg text-xs w-full">
                {{ review }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
