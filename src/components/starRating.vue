<script setup lang="ts">
import { ref } from "vue";

const rating = ref(3);
const maxStars = ref(5);

function selectStar(star: any, index: number) {
  rating.value = star;
  console.log("index", index + 1);
}
</script>
<template>
  <div class="star-rating">
    <span
      v-for="(star, index) in maxStars"
      :key="star"
      @click="selectStar(star, index)"
    >
      <svg
        :class="{ selected: star <= rating }"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path
          :class="{ filled: star <= rating }"
          d="M12 2.69l2.76 8.45H22l-6.64 4.83 2.67 8.46L12 17.34l-6.04 4.09 2.66-8.46L2 11.14h7.24L12 2.69z"
        />
      </svg>
    </span>
  </div>
</template>
<style scoped>
.star-rating {
  display: flex;
}

.star-rating svg {
  fill: none;
  stroke: #797878;
  stroke-width: 1.5px;
  width: 24px;
  height: 24px;
  transition: all 0.2s;
  cursor: pointer;
}

.star-rating svg.selected {
  stroke: #ffc107;
  fill: #ffc107;
}

.star-rating svg.filled {
  fill: #ffc107;
}
</style>
