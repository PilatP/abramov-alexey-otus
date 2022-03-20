<template>
  <div class="container">
    <div>
      <el-input
        type="text"
        id="start"
        size="small"
        :placeholder="data.startValue.toString()"
        disabled
      />
      <el-input
        type="text"
        :id="index"
        size="small"
        :value="data.values[index]"
        @focus="emit('focus', index)"
        v-for="(action, index) in data.actions"
        :key="index"
      >
        <template #prepend>{{ getActionSign(action) }}</template>
      </el-input>
    </div>
    <el-input
      type="text"
      id="result"
      size="small"
      :placeholder="data.endValue.toString()"
      disabled
    >
      <template #prepend>=</template>
    </el-input>
  </div>
</template>
//
<script setup lang="ts">
import { defineProps, PropType, defineEmits } from "vue";
import { ActionTypes } from "../store";

export type InputCommand = { type: CommandTypes; value?: string };
export type CommandTypes = "input" | "left-delete" | "right-delete" | "result";

const props = defineProps({
  data: {
    type: Object as PropType<{
      actions: ActionTypes[];
      values: string[];
      startValue: number;
      endValue: number;
    }>,
    required: true,
  },
  command: {
    type: Object as PropType<InputCommand>,
  },
});

const getActionSign = (actionType: ActionTypes) => {
  switch (actionType) {
    case "add":
      return "+";
    case "sub":
      return "-";
    case "multiple":
      return "*";
    case "division":
      return ":";
    case "power":
    default:
      return "^";
  }
};

const emit = defineEmits(["focus"]);
</script>
<style scoped>
.container {
  display: flex;
}
.el-input {
  width: 120px;
}
</style>
