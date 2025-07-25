<template>
  <a-spin
    :spinning="
      loadingUrl.has('market/products/id') || loadingUrl.has('market/products/')
    "
  >
    <div class="min-h-screen bg-white">
      <div class="container mx-auto px-4 py-8">
        <div class="flex gap-8 relative">
          <!-- Filter Button for Mobile -->

          <!-- Sidebar for Desktop -->
          <FilterSidebar
            v-if="!isMobileDrawer"
            :price-range="priceRange"
            :selected-category="selectedCategory"
            :selected-color="selectedColor"
            :on-price-change="
              (val) => updateQuery({ min_price: val[0], max_price: val[1] })
            "
            :on-category-change="(val) => updateQuery({ category: val })"
            :on-color-change="(val) => updateQuery({ color: val })"
            class="max-md:hidden"
          />
          <!-- Drawer for Mobile -->
          <a-drawer
            v-model:open="drawerVisible"
            placement="right"
            :width="drawerWidth"
            :closable="true"
            class="md:hidden"
          >
            <template #title>{{ $t("filter") }}</template>
            <FilterSidebar
              :price-range="priceRange"
              :selected-category="selectedCategory"
              :selected-color="selectedColor"
              :on-price-change="
                (val) => updateQuery({ min_price: val[0], max_price: val[1] })
              "
              :on-category-change="(val) => updateQuery({ category: val })"
              :on-color-change="(val) => updateQuery({ color: val })"
            />
          </a-drawer>
          <!-- Main Content Area -->
          <div class="w-2/3 max-md:w-full">
            <!-- Top Bar -->
            <div class="rounded-lg p-4 mb-6 max-sm:p-0">
              <div
                class="flex justify-between items-center max-sm:flex-col max-sm:gap-2"
              >
                <div
                  class="flex items-center gap-4 max-sm:w-full max-sm:justify-between"
                >
                  <div class="flex items-center gap-2">
                    <button
                      @click="viewMode = 'grid'"
                      :class="['p-2 rounded transition-colors max-sm:p-0']"
                    >
                      <Grip
                        class="w-6 h-6"
                        :class="
                          viewMode === 'grid'
                            ? 'text-yellow-500'
                            : 'text-gray-600/90 hover:text-gray-600'
                        "
                      />
                    </button>
                    <button
                      @click="viewMode = 'list'"
                      :class="['p-2 rounded transition-colors max-sm:p-0']"
                    >
                      <List
                        class="w-6 h-6"
                        :class="
                          viewMode !== 'grid'
                            ? 'text-yellow-500'
                            : 'text-gray-600/90 hover:text-gray-600'
                        "
                      />
                    </button>
                  </div>
                  <span class="text-gray-600">
                    {{
                      $t("catalog.products_count", {
                        count: products?.length || 0,
                      })
                    }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Product Display -->
            <div v-if="products?.length > 0" class=" ">
              <!-- Grid View -->
              <div
                v-if="viewMode === 'grid'"
                class="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1"
              >
                <Product
                  v-for="product in products"
                  :key="product.id"
                  :product="product"
                  :view-mode="viewMode"
                />
              </div>

              <!-- List View -->
              <div v-else class="flex flex-col gap-4">
                <div
                  v-for="product in products"
                  :key="product.id"
                  class="bg-white rounded-lg overflow-hidden"
                >
                  <Product :product="product" :view-mode="viewMode" />
                </div>
              </div>
            </div>

            <!-- Empty State -->
            <div v-else class="flex flex-col items-center justify-center py-16">
              <Empty>
                <template #description>
                  <h3 class="text-xl font-semibold text-gray-900 mb-2">
                    {{ $t("catalog.not_found_title") }}
                  </h3>
                  <p class="text-gray-600 text-center max-w-md">
                    {{ $t("catalog.not_found_desc") }}
                  </p>
                  <a-button @click="clearFilters" type="primary">
                    {{ $t("catalog.clear_filters") }}
                  </a-button>
                </template>
              </Empty>
            </div>
          </div>
        </div>
      </div>
    </div>
  </a-spin>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";

import useCore from "@/stores/core.pinia";
import { List, Grip, Filter as FilterIcon } from "lucide-vue-next";
import { Select, Drawer, Empty } from "ant-design-vue";
import Product from "@/components/card/Product.vue";
import FilterSidebar from "@/components/card/FilterSidebar.vue";
import useProduct from "@/stores/product.pinia";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";

import useMain from "@/stores/main.pinia";

const productStore = useProduct();
const route = useRoute();
const router = useRouter();
const mainStore = useMain();
const core = useCore();
const { locale, loadingUrl } = storeToRefs(core);
const { products } = storeToRefs(productStore);

// Helper to parse query params
function parseQueryArray(val) {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  return [val];
}

// Initialize filter state from query
const priceRange = ref([
  Number(route.query.min_price) || 0,
  Number(route.query.max_price) || 10000000,
]);
const selectedCategory = ref(route.query.category || "");
const selectedColor = ref(route.query.color || "");

const viewMode = ref("grid"); // 'grid' or 'list'

// Update query params when filters change
function updateQuery(newValues = {}) {
  router.replace({
    query: {
      ...route.query,
      ...newValues,
    },
  });
}


// Fetch products when query changes
watch(
  () => route.query,
  () => {
    productStore.getProducts({
      min_price: Number(route.query.min_price) || 0,
      max_price: Number(route.query.max_price) || 10000000,
      category: route.query.category || undefined,
      color: route.query.color || undefined,
      search: route.query.search || undefined,
    });
    // Sync local state with query
    priceRange.value = [
      Number(route.query.min_price) || 0,
      Number(route.query.max_price) || 10000000,
    ];
    selectedCategory.value = route.query.category || "";
    selectedColor.value = route.query.color || "";
  },
  { immediate: true }
);

const clearFilters = () => {
  priceRange.value = [0, 10000000];
  selectedCategory.value = "";
  selectedColor.value = "";
  router.push({ path: route.path, query: "" });
  console.log("haromi");
};

const drawerVisible = ref(false);
const isMobileDrawer = ref(false);
const drawerWidth = ref(500);

function updateDrawerMode() {
  if (window.innerWidth <= 640) {
    isMobileDrawer.value = true;
    drawerWidth.value = "100vw";
  } else if (window.innerWidth <= 768) {
    isMobileDrawer.value = true;
    drawerWidth.value = 500;
  } else {
    isMobileDrawer.value = false;
  }
}

onMounted(() => {
  mainStore.getCategories();
  mainStore.getColors();
  updateDrawerMode();
  window.addEventListener("resize", updateDrawerMode);
});
onUnmounted(() => {
  window.removeEventListener("resize", updateDrawerMode);
});
</script>
