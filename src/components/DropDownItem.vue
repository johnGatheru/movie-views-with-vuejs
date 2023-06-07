<script setup lang="ts"></script>
<template>
  <div class="dropdown-menu-item">
    <slot></slot>
  </div>
</template>

<style scoped>
.dropdown-menu-item {
  padding: 1.2em 1em;
  font-size: 90%;
  font-weight: 600;
  color: grey;
  /* box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.08); */
}
.dropdown-menu-item:hover {
  cursor: pointer;
  background-color: rgb(175, 174, 174);
  color: white;
}
.dropdown-menu-item:last-child {
  border-radius: 5px;
}
</style>
