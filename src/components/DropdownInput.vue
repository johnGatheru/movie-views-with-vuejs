<script setup lang="ts">
import { ref } from "vue";
defineProps<{
  selected?: string;
  value?: string | number;
  placeholder?: string;
  modelValue?: string | number;
  menuOpen?: boolean;
  testReadonly?: string;
  // allItems: Array<string | undefined>;
}>();
const emit = defineEmits(["update:modelValue"]);
function takeInput(event: Event) {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
}
const menuOpen = ref(false);
</script>
<template>
  <div class="order-parameters">
    <div class="params-container flexed">
      <div class="param">
        <div class="flexed flexed-column">
          <div class="param-input-container">
            <div class="param-input" @click="menuOpen = !menuOpen">
              <input
                type="text"
                :placeholder="placeholder"
                @input="takeInput($event)"
                :value="modelValue"
                testReadonly
              />
              <img
                src="@/assets/icons/dropdown.svg"
                alt=""
                :class="{ reversed: menuOpen }"
                width="15"
              />
            </div>
            <div
              class="dropdown-container"
              @mouseleave="menuOpen = false"
              :class="{ active: menuOpen }"
            >
              <div class="dropdown-menu" @click="menuOpen = false">
                <slot></slot>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.order-parameters {
  margin: 0.2em 0;
  max-width: 840px;
}
.params-container {
  justify-content: space-between;
  gap: 2em;
}
.param {
  width: 100%;
}
.param .flexed {
  gap: 0;
}
.param .label {
  margin: 0.5em 0;
  font-weight: 700;
  font-size: 90%;
}
.param-input-container {
  position: relative;
}
.param-input {
  background-color: rgb(247, 247, 247);

  border-radius: 5px;
  z-index: 1;
  cursor: pointer;
  padding: 0em 0.5em;
  font-family: inherit;

  /* border-radius: 12px; */
  display: flex;
  justify-content: space-between;
  /* margin: 0.5em 0; */
}
.param-input img {
  /* margin: 0 1em; */
  transition: transform 0.3s ease-in-out;
}
.param-input img.reversed {
  transform: rotate(180deg);
}
.param-input input {
  border: none;
  outline: none;
  font-family: inherit;
  padding: 0.5em 1em;
  background: transparent;
  cursor: pointer;
  font-size: 90%;
  font-weight: 600;
  color: grey;

  /* text-transform: uppercase; */
}
.dropdown-container {
  opacity: 0;
  height: 0;
  position: absolute;
  width: 100%;
  transition: opacity 0.3s ease-in;
  display: none;
}
.dropdown-container.active {
  display: inline-block;
  opacity: 1;
  height: auto;
}
.dropdown-menu {
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  background: #fff;
  max-height: 300px;
  overflow: auto;
  z-index: 2000;
}
.dropdown-menu {
  position: relative;
}
</style>
