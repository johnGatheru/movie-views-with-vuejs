<script setup lang="ts">
defineProps<{
  movie: {
    Poster: string;
    Title: string;
    Year: string;
  };
}>();
</script>
<template>
  <div class="flex flex-col">
    <div class="">
      <img :src="movie.Poster" alt="" class="h-72 object-cover" />
    </div>
    <div class="flex flex-col">
      <h2>{{ movie.Title }}</h2>
      <div class="flex gap-1">
        Year: <span>{{ movie.Year }}</span>
      </div>
      <p></p>
    </div>
  </div>
</template>
