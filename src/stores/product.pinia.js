import { defineStore } from "pinia";
import { api } from "../utils/api.js";
import { message } from "ant-design-vue";
import useCore from "./core.pinia";

const useProduct = defineStore("product", {
  state: () => ({
    products: [],
    product: {},
    orders: [],
    cardId: -1,
  }),
  actions: {
    getProducts(params) {
      const core = useCore();
      core.loadingUrl.add("market/products/");
      api({
        url: "market/products/",
        method: "GET",
        params,
      })
        .then(({ data }) => {
          this.products = data.results;
        })
        .catch((error) => {})
        .finally(() => {
          core.loadingUrl.delete("market/products/");
        });
    },
    getProduct(id, callback) {
      const core = useCore();
      core.loadingUrl.add("market/products/id");
      api({
        url: "market/products/" + id + "/",
        method: "GET",
      })
        .then(({ data }) => {
          this.product = data;
          callback(data);
        })
        .catch((error) => {})
        .finally(() => {
          core.loadingUrl.delete("market/products/id");
        });
    },
    getCategoryProduc(params, callback) {
      const core = useCore();
      core.loadingUrl.add("market/products/");
      api({
        url: "market/products/",
        method: "GET",
        params,
      })
        .then(({ data }) => {
          callback(data.results);
        })
        .catch((error) => {})
        .finally(() => {
          core.loadingUrl.delete("market/products/");
        });
    },
    addComment(data, callback) {
      const core = useCore();
      core.loadingUrl.add("market/products/review/create/");
      api({
        url: "market/products/review/create/",
        method: "POST",
        data,
      })
        .then(({ data }) => {
          callback(data.results);
        })
        .catch((error) => {})
        .finally(() => {
          core.loadingUrl.delete("market/products/review/create/");
        });
    },
    createOrderDetail(data, callback) {
      const core = useCore();
      core.loadingUrl.add("order");
      api({
        url: "order/card-details/",
        method: "POST",
        data,
      })
        .then(({ data }) => {
          callback(data);
          this.cardId = data.id;
        })
        .catch((error) => {
          this.cardId = -1;
          if (error.response.data.card_number?.[0]) {
            message.error(error.response.data.card_number[0]);
          } else {
            message.error("Something went wrong!");
          }
        })
        .finally(() => {
          core.loadingUrl.delete("order");
        });
    },
    sendCode(data, callback) {
      const core = useCore();
      core.loadingUrl.add("order");
      api({
        url: "order/card-verify-code/",
        method: "POST",
        data,
      })
        .then(({ data }) => {
          callback(data);
        })
        .catch((error) => {
          if (error?.response?.data?.error) {
            message.error(error.response.data.error);
          } else {
            message.error("Something went wrong!");
          }
        })
        .finally(() => {
          core.loadingUrl.delete("order");
        });
    },
    submitCode(data, callback) {
      const core = useCore();
      core.loadingUrl.add("order");
      api({
        url: "order/card-verify/",
        method: "POST",
        data,
      })
        .then(({ data }) => {
          callback(data);
        })
        .catch((error) => {
          message.error("Password is wrong!");
        })
        .finally(() => {
          core.loadingUrl.delete("order");
        });
    },
    createOrder(data, callback) {
      const core = useCore();
      core.loadingUrl.add("order");
      api({
        url: "order/order/",
        method: "POST",
        data: { ...data, card_id: this.cardId },
      })
        .then(({ data }) => {
          callback();
        })
        .catch((error) => {
          message.error(t("Something went wrong!"));
        })
        .finally(() => {
          this.cardId = -1;
          core.loadingUrl.delete("order");
        });
    },
    getOrder(data, callback) {
      const core = useCore();
      core.loadingUrl.add("order");
      api({
        url: "order/orders/",
        method: "GET",
      })
        .then(({ data }) => {
          this.orders = data.results;
        })
        .catch((error) => {
          message.error(t("Something went wrong!"));
        })
        .finally(() => {
          this.cardId = -1;
          core.loadingUrl.delete("order");
        });
    },
  },
});

export default useProduct;
