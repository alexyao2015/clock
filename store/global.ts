import { acceptHMRUpdate, defineStore } from "pinia";

export const useGlobalStore = defineStore("global", {
  state: () => ({
    punchInterval: null,
  }),
});

// Allow HMR
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGlobalStore, import.meta.hot));
}
