<template>
  <div class="container">
    <h1>Привет!</h1>
    <div class="container--info">
      <p>Добро пожаловать на {{ trainingDays }} тренировочный день,</p>
      <p>Ваш последний результат - решено {{ taskSolved }} из {{ tasks }}.</p>
      <p>Общая точность {{ accuracy }}%.</p>
    </div>
    <div class="container--settings">
      <h3>Настройки</h3>
      <div class="sliders">
        <el-slider v-model="duration" :min="1" :max="15" />
        <span>Длительность {{ duration }} минут</span>
        <el-slider v-model="complexity" :min="1" :max="15" />
        <span>Сложность {{ complexity }}</span>
      </div>
      <el-checkbox
        v-model="actionAdd"
        label="Суммирование"
        size="large"
        @change="onActionChange('add')"
      />
      <el-checkbox
        v-model="actionSubtraction"
        label="Разность"
        size="large"
        @change="onActionChange('sub')"
      />
      <el-checkbox
        v-model="actionMultiple"
        label="Умножение"
        size="large"
        @change="onActionChange('multiple')"
      />
      <el-checkbox
        v-model="actionDivision"
        label="Деление"
        size="large"
        @change="onActionChange('division')"
      />
      <el-checkbox
        v-model="actionPower"
        label="Возведение в степень"
        size="large"
        @change="onActionChange('power')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { ActionTypes, useStore } from "../store";

const store = useStore();
const {
  trainingDays,
  accuracy,
  lastResult: { tasks, taskSolved },
} = store.state.app;
const { activatedActions } = store.state.settings;

const actionAdd = ref(activatedActions.some((a) => a === "add"));
const actionSubtraction = ref(activatedActions.some((a) => a === "sub"));
const actionMultiple = ref(activatedActions.some((a) => a === "multiple"));
const actionDivision = ref(activatedActions.some((a) => a === "division"));
const actionPower = ref(activatedActions.some((a) => a === "power"));

const duration = computed({
  get() {
    return store.state.settings.duration;
  },
  set(value) {
    return store.commit("updateDuration", value);
  },
});
const complexity = computed({
  get() {
    return store.state.settings.complexity;
  },
  set(value) {
    return store.commit("updateComplexity", value);
  },
});

const onActionChange = (actionType: ActionTypes) => {
  store.commit("toggleAction", actionType);
};
</script>
<style scoped>
.container {
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  width: fit-content;
  margin: 0 auto;
  gap: 20px;
}
.container--info {
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  gap: 8px;
}
.container--settings {
  display: flex;
  flex-flow: column;
  width: 100%;
}
.sliders {
  margin-bottom: 16px;
}
</style>
