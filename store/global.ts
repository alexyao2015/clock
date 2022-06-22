import { acceptHMRUpdate, defineStore } from "pinia";

export const useGlobalStore = defineStore("global", {
  state: () => ({
    punchInterval: null,
    currentEmployeeID: "",
  }),
  actions: {
    logout() {
      this.currentEmployeeID = "";
    },
  },
});

// Allow HMR
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGlobalStore, import.meta.hot));
}
