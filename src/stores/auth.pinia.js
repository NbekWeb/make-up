import { defineStore } from "pinia";
import { api } from "../utils/api.js";
import { message } from "ant-design-vue";
import useCore from "./core.pinia";

const useAuth = defineStore("auth", {
  state: () => ({
    userData: {},
  }),
  actions: {
    postLogin(data, callback = () => {}) {
      api({
        url: "account/signin/",
        method: "POST",
        data,
      })
        .then(({ data }) => {
          localStorage.setItem("access_token", data.access);
          callback();
        })
        .catch((error) => {
          if (error?.response?.data?.detail) {
            message.error(error?.response?.data?.detail);
          } else {
            message.error("Something went wrong!");
          }
        })
        .finally(() => {});
    },
    postRegis(data, callback = () => {}) {
      api({
        url: "account/signup/",
        method: "POST",
        data,
      })
        .then(({}) => {
          callback();
        })
        .catch((error) => {
          if (error?.response?.data?.non_field_errors?.[0]) {
            message.error(error?.response?.data?.non_field_errors?.[0]);
          } else {
            message.error("Something went wrong!");
          }
        })
        .finally(() => {});
    },
    getUser() {
      const core = useCore();
      core.loadingUrl.add("user");
      api({
        url: "account/user-detail/",
        method: "GET",
      })
        .then(({ data }) => {
          this.userData = data;
        })
        .catch((error) => {
          message.error("Something went wrong!");
        })
        .finally(() => {
          core.loadingUrl.delete("user");
        });
    },
    changePassword(data, callback = () => {}) {
      const core = useCore();
      core.loadingUrl.add("user");
      api({
        url: "account/update-password/",
        method: "PATCH",
        data,
      })
        .then(({}) => {
          callback();
        })
        .catch((error) => {
          message.error("Something went wrong!");
        })
        .finally(() => {
          core.loadingUrl.delete("user");
        });
    },
    updateProfile(data, callback = () => {}) {
      const core = useCore();
      core.loadingUrl.add("user");
      api({
        url: "account/user-detail/",
        method: "PUT",
        data,
      })
        .then(({}) => {
          callback();
        })
        .catch((error) => {
          message.error("Something went wrong!");
        })
        .finally(() => {
          core.loadingUrl.delete("user");
        });
    },
  },
});

export default useAuth;
