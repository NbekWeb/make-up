import { defineStore } from "pinia";
const useCore = defineStore("core", {
  state: () => ({
    loadingUrl: new Set([]),
    locale: localStorage.getItem("locale") || "en",
  }),
  actions: {
    setLocale(locale) {
      this.locale = locale;
      localStorage.setItem("locale", locale);
    },
  },
});

export default useCore;
