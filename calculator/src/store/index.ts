import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";

interface IAppState {
  trainingDays: number;
  accuracy: number;
  lastResult: {
    tasks: number;
    taskSolved: number;
  };
}

export type ActionTypes = "add" | "sub" | "multiple" | "division" | "power";
interface ISettingsState {
  duration: number;
  complexity: number;
  activatedActions: ActionTypes[];
}

export interface IState {
  app: IAppState;
  settings: ISettingsState;
}
export const store = createStore<IState>({
  state: {
    app: {
      trainingDays: 1,
      accuracy: 100,
      lastResult: {
        tasks: 0,
        taskSolved: 0,
      },
    },
    settings: {
      duration: 10,
      complexity: 3,
      activatedActions: ["add", "sub"],
    },
  },
  getters: {},
  mutations: {
    toggleAction(state, payload: ActionTypes) {
      const actionExist = state.settings.activatedActions.some(
        (action) => action === payload
      );
      if (actionExist)
        state.settings.activatedActions =
          state.settings.activatedActions.filter(
            (action) => action !== payload
          );
      else state.settings.activatedActions.push(payload);
    },
    updateDuration(state, payload: number) {
      state.settings.duration = payload;
    },
    updateComplexity(state, payload: number) {
      state.settings.complexity = payload;
    },
    finishTask(state) {
      state.app.lastResult.taskSolved += 1;
    },
    newTask(state) {
      state.app.lastResult.tasks += 1;
    },
  },
  actions: {},
  modules: {},
});

export const key: InjectionKey<Store<IState>> = Symbol();

export const useStore = () => {
  return baseUseStore(key);
};
