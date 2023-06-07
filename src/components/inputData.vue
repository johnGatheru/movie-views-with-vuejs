<script setup lang="ts">
defineProps<{
  placeholder: string;
  modelValue: string | number;
}>();
const emit = defineEmits(["update:modelValue"]);
function takeInput(event: Event) {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
}
</script>
<template>
  <input
    class="outline-none py-1 px-1 border border-gray-500 rounded-md mt-1 text-gray-600"
    type="text"
    :placeholder="placeholder"
    @input="takeInput($event)"
    :value="modelValue"
  />
</template>
