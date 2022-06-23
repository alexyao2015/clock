import { acceptHMRUpdate, defineStore } from "pinia";

export enum ToastType {
  "alert",
  "message",
  "success",
}

export const useToastStore = defineStore("toast", {
  state: () => ({
    msg: "",
    type: ToastType.alert,
    display: false,
  }),
  getters: {
    backgroundColor: (state) => {
      if (state.type == ToastType.alert) {
        return "red lighten-2";
      } else if (state.type == ToastType.success) {
        return "green";
      } else {
        return "grey darken-2";
      }
    },
    buttonColor: (state) =>
      state.type == ToastType.message ? "indigo" : "white",
  },
});

// Allow HMR
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useToastStore, import.meta.hot));
}
