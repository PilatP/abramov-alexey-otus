<template>
  <div class="container">
    <div class="btn digit" @click="emit('input', $event.target.textContent)">
      1
    </div>
    <div class="btn digit" @click="emit('input', $event.target.textContent)">
      2
    </div>
    <div class="btn digit" @click="emit('input', $event.target.textContent)">
      3
    </div>
    <div class="btn action" @click="emit('left-delete')">&lt;</div>
    <div class="btn digit" @click="emit('input', $event.target.textContent)">
      4
    </div>
    <div class="btn digit" @click="emit('input', $event.target.textContent)">
      5
    </div>
    <div class="btn digit" @click="emit('input', $event.target.textContent)">
      6
    </div>
    <div class="btn action" @click="emit('right-delete')">&gt;</div>
    <div class="btn digit" @click="emit('input', $event.target.textContent)">
      7
    </div>
    <div class="btn digit" @click="emit('input', $event.target.textContent)">
      8
    </div>
    <div class="btn digit" @click="emit('input', $event.target.textContent)">
      9
    </div>
    <div class="btn action">?</div>
    <div
      class="btn digit zero"
      @click="emit('input', $event.target.textContent)"
    >
      0
    </div>
    <div class="btn action equal" @click="emit('result')">=</div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from "vue";
const emit = defineEmits(["input", "left-delete", "right-delete", "result"]);
</script>
<style scoped>
.container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  width: max-content;
}
.el-input {
  width: 100px;
}

.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: black;
  font-weight: 800;
  cursor: pointer;
}
.digit {
  background: orange;
}
.zero {
  grid-column: 2;
}

.equal {
  grid-column: 4;
}

.action {
  background: gray;
}
</style>
