<template>
  <div>
    <el-container>
      <el-header
        ><el-button @click="router.push('/')">Отмена</el-button>
        <GameTimer @time:up="onTimeUp" :timeLimit="duration"
      /></el-header>
      <el-main
        ><GameInput :data="inputData" :command="command" @focus="onInputFocus"
      /></el-main>
      <el-main v-if="taskResult !== null">
        <el-alert
          title="Задача решена успешно"
          type="success"
          v-if="taskResult === 'success'"
        />
        <el-alert
          title="Ошибка при решении задачи"
          type="error"
          v-if="taskResult === 'error'"
        />
        <el-alert
          title="Время вышло"
          type="error"
          v-if="taskResult === 'time'"
        />
      </el-main>
      <el-main
        ><Calculator
          @result="onCalcClick"
          @input="onInput"
          @left-delete="onLeftDelete"
          @right-delete="onRightDelete"
      /></el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import GameTimer from "./GameTimer.vue";
import GameInput, { InputCommand } from "./GameInput.vue";
import Calculator from "./Calculator.vue";
import { onMounted, ref } from "vue";
import { ActionTypes, useStore } from "@/store";

const store = useStore();
const { activatedActions, duration } = store.state.settings;
const command = ref<InputCommand>();
const currentInputIndex = ref(0);

const complexityNumber = store.state.settings.complexity > 3 ? 10000 : 100;
const startValue = Math.trunc(Math.random() * complexityNumber);
const endValue = Math.trunc(Math.random() * complexityNumber);
const inputData = ref<{
  actions: ActionTypes[];
  values: string[];
  startValue: number;
  endValue: number;
}>({
  actions: activatedActions,
  values: [],
  startValue,
  endValue,
});
const taskResult = ref<null | "success" | "error" | "time">(null);
const onCalcClick = () => {
  const result = calc();
  if (result === inputData.value.endValue) {
    taskResult.value = "success";
    store.commit("finishTask");
    finishTask();
  } else taskResult.value = "error";
};
const onRightDelete = () => {
  clearError();
  const index = currentInputIndex.value;
  inputData.value.values[index] = inputData.value.values[index].slice(
    1,
    inputData.value.values[index].length
  );
};
const onLeftDelete = () => {
  clearError();
  const index = currentInputIndex.value;
  inputData.value.values[index] = inputData.value.values[index].slice(
    0,
    inputData.value.values[index].length - 1
  );
};
const onInput = (value: string) => {
  clearError();
  const index = currentInputIndex.value;
  inputData.value.values[index] = `${
    inputData.value.values[index]?.trim() || ""
  }${value.trim()}`;
};
const onInputFocus = (value: number) => {
  currentInputIndex.value = value;
};

const calc = () => {
  let result = inputData.value.startValue;
  const values = inputData.value.values;
  inputData.value.actions.forEach((action, index) => {
    const value = Number.parseInt(values[index]);
    if (action === "add") result += value;
    else if (action === "sub") result -= value;
    else if (action === "multiple") result *= value;
    else if (action === "division") result /= value;
    else if (action === "power") result = Math.pow(result, value);
  });

  return result;
};

const clearError = () => (taskResult.value = null);

onMounted(() => {
  store.commit("newTask");
});

const onTimeUp = () => {
  taskResult.value = "time";
  finishTask();
};

const finishTask = () => setTimeout(() => router.push("/"), 1500);
</script>
<style scoped>
.el-container {
  max-width: 700px;
  margin: 0 auto;
}
.el-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
