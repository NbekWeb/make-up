<template>
  <div v-if="breadcrumbItems.length > 1" class="bg-gray-100 ">
    <div class="container mx-auto px-4 py-4">
      <nav class="text-sm">
        <ol class="flex items-center space-x-2">
          <li v-for="(item, index) in breadcrumbItems" :key="index">
            <router-link
              v-if="item.path && index < breadcrumbItems.length - 1"
              :to="item.path"
              class="text-gray-500 hover:text-gray-700 transition-colors"
            >
              {{ item.title }} /
            </router-link>
            <span
              v-else-if="index < breadcrumbItems.length - 1"
              class="text-gray-500"
            >
              {{ item.title }}
            </span>
            <span v-else class="text-yellow-500 font-medium">
              {{ item.title }}
            </span>

           
          </li>
        </ol>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";

const route = useRoute();
const { t } = useI18n();

// Get breadcrumb items from route meta or generate from route path
const breadcrumbItems = computed(() => {
  const items = [];

  // Always add home as first item
  items.push({
    title: t("common.home"),
    path: "/",
  });

  // If route has breadcrumb meta, use it
  if (route.meta?.breadcrumb) {
    const breadcrumbItems = route.meta.breadcrumb.map((item) => ({
      ...item,
      title:
        typeof item.title === "string" && item.title.includes(".")
          ? t(item.title)
          : item.title,
    }));
    items.push(...breadcrumbItems);
  } else {
    // Generate breadcrumb from route path
    const pathSegments = route.path.split("/").filter((segment) => segment);

    pathSegments.forEach((segment, index) => {
      const path = "/" + pathSegments.slice(0, index + 1).join("/");
      const title = getBreadcrumbTitle(segment, path);

      items.push({
        title,
        path: index < pathSegments.length - 1 ? path : null, // Last item has no path
      });
    });
  }

  return items;
});

// Helper function to get breadcrumb title from segment
const getBreadcrumbTitle = (segment, path) => {
  // Map common segments to i18n keys
  const segmentMap = {
    catalog: "navigation.catalog",
    blog: "navigation.blog",
    shop: "navigation.shop",
    beauty: "navigation.beauty",
    demo: "common.demo",
  };

  const i18nKey = segmentMap[segment];
  if (i18nKey) {
    return t(i18nKey);
  }

  // Fallback: capitalize first letter
  return segment.charAt(0).toUpperCase() + segment.slice(1);
};
</script>
