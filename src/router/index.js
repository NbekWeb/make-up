import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "@/layouts/MainLayout.vue";
import HomePage from "@/views/HomePage.vue";
import CatalogPage from "@/views/CatalogPage.vue";
import BlogPage from "@/views/BlogPage.vue";
import ProductPage from "@/views/ProductPage.vue";

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "",
        name: "Home",
        component: HomePage,
        meta: {
          title: "SeedBee - Beauty & Cosmetics",
        },
      },
      {
        path: "catalog",
        name: "Catalog",
        component: CatalogPage,
        meta: {
          title: "Catalog - SeedBee",
          breadcrumb: [{ title: "navigation.catalog", path: null }],
        },
      },
      {
        path: "blog",
        name: "Blog",
        component: BlogPage,
        meta: {
          title: "Blog - SeedBee",
        },
      },
      {
        path: "product/:id",
        name: "Product",
        component: ProductPage,
        meta: {
          breadcrumb: [{ title: "Product Details", path: null }],
        },
      },
      {
        path: "/login",
        name: "Login",
        component: () => import("@/views/LoginPage.vue"),
        meta: {
          title: "Login - SeedBee",
        },
      },
      {
        path: "/register",
        name: "Register",
        component: () => import("@/views/RegisterPage.vue"),
        meta: {
          title: "Register - SeedBee",
        },
      },
      {
        path: "/profile",
        name: "Profile",
        component: () => import("@/views/ProfilePage.vue"),
        meta: {
          title: "Profile - SeedBee",
        },
      },
      {
        path: "/order",
        name: "Order",
        component: () => import("@/views/OrderPage.vue"),
        meta: {
          title: "Order - SeedBee",
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Global navigation guard to update document title
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("access_token");
  if (!!token && (to.path == "/login" || to.path == "/register")) {
    next({ name: "Home" });
  }

  // Set document title from route meta
  if (to.meta && to.meta.title) {
    document.title = to.meta.title;
  } else {
    document.title = "Makali - Beauty & Cosmetics"; // Default title
  }

  next();
});

export default router;
