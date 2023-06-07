<script setup lang="ts">
defineProps<{
  text: string;
}>();
</script>
<template>
  <button
    @click="$emit('on-clicked', $event)"
    class="border border-orange-800 mt-1 py-1 px-2 rounded-md"
  >
    {{ text }}
  </button>
</template>
