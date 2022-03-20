<template>
  <div class="timer">{{ timer }}</div>
</template>

<script setup lang="ts">
import { onMounted, ref, defineEmits, defineProps } from "vue";

const currentTime = ref(0);
const timer = ref("00:00");

const formatNumber = (value: number) => {
  return value.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
};
const getCurrentTime = () => {
  currentTime.value += 1;
  const minutes = Math.trunc(currentTime.value / 60);
  const seconds = currentTime.value - minutes * 60;
  timer.value = `${formatNumber(minutes)}:${formatNumber(seconds)}`;
  if (props.timeLimit * 60 < currentTime.value) emit("time:up");
};
onMounted(() => {
  setInterval(getCurrentTime, 1000);
});
const props = defineProps({
  timeLimit: {
    type: Number,
    required: true,
  },
});
const emit = defineEmits(["time:up"]);
</script>
<style scoped>
.timer {
  display: flex;
  width: 80px;
  border: 1px solid;
  border-color: var(--el-border);
  color: var(--el-text-color-regular);
  justify-content: center;
  padding: 4px;
}
</style>
