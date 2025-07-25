import { defineStore } from "pinia";
import { api } from "../utils/api.js";
import useCore from "./core.pinia";

const useMain = defineStore("main", {
  state: () => ({
    banners: [],
    adds: [],
    partners: [],
    categories: [],
    colors: [],
    blogs: [],
    blog: null,
  }),
  actions: {
    getBanners() {
      const core = useCore();
      core.loadingUrl.add("site/banners/");
      api({
        url: "site/banners/",
        method: "GET",
      })
        .then(({ data }) => {
          this.banners = data.results;
        })
        .catch((error) => {})
        .finally(() => {
          core.loadingUrl.delete("site/banners/");
        });
    },
    getAdds() {
      const core = useCore();
      core.loadingUrl.add("site/advertisements/");
      api({
        url: "site/advertisements/",
        method: "GET",
      })
        .then(({ data }) => {
          this.adds = data.results;
        })
        .catch((error) => {})
        .finally(() => {
          core.loadingUrl.delete("site/advertisements/");
        });
    },
    getPartners() {
      const core = useCore();
      core.loadingUrl.add("site/partners/");
      api({
        url: "site/partners/",
        method: "GET",
      })
        .then(({ data }) => {
          this.partners = data.results;
        })
        .catch((error) => {})
        .finally(() => {
          core.loadingUrl.delete("site/advertisements/");
        });
    },
    getCategories() {
      const core = useCore();
      core.loadingUrl.add("market/categories/");
      api({
        url: "market/categories/",
        method: "GET",
      })
        .then(({ data }) => {
          this.categories = data;
        })
        .catch((error) => {})
        .finally(() => {
          core.loadingUrl.delete("market/categories/");
        });
    },
    getColors() {
      const core = useCore();
      core.loadingUrl.add("market/products/colors/");
      api({
        url: "market/products/colors/",
        method: "GET",
      })
        .then(({ data }) => {
          this.colors = data?.colors;
        })
        .catch((error) => {})
        .finally(() => {
          core.loadingUrl.delete("market/products/colors/");
        });
    },
    getBlogs() {
      const core = useCore();
      core.loadingUrl.add("site/blogs/");
      api({
        url: "site/blogs/",
        method: "GET",
      })
        .then(({ data }) => {
          this.blogs = data?.results;
        })
        .catch((error) => {})
        .finally(() => {
          core.loadingUrl.delete("site/blogs/");
        });
    },
    getBlog(id) {
      const core = useCore();
      core.loadingUrl.add(`site/blogs//`);
      api({
        url: `site/blogs/${id}/`,
        method: "GET",
      })
        .then(({ data }) => {
          this.blog = data;
        })
        .catch((error) => {})
        .finally(() => {
          core.loadingUrl.delete("site/blogs/");
        });
    },
  },
});

export default useMain;
