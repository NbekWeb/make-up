<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { Search, X } from "lucide-vue-next";
import { useRouter, useRoute } from "vue-router";

const route = useRoute();
const router = useRouter();

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const searchInput = ref(null);
const searchQuery = ref("");

const closeSearch = () => {
  emit("update:modelValue", false);
  searchQuery.value = "";
};

const handleSearch = () => {
  console.log(searchQuery.value);
  if (searchQuery.value) {

    router.push({
      path: "/catalog",
      query: {
        search: searchQuery.value,
      },
    });
    closeSearch();
  }
};

const handleKeydown = (event) => {
  if (event.key === "Enter") {
    handleSearch();
  } else if (event.key === "Escape") {
    closeSearch();
  }
};

// Focus input when overlay opens
const focusInput = () => {
  if (props.modelValue && searchInput.value) {
    setTimeout(() => {
      searchInput.value.focus();
    }, 100);
  }
};

// Watch for modelValue changes to focus input
import { watch } from "vue";
watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue) {
      focusInput();
    }
  }
);

watch(
  () => route.query.search,
  (newValue) => {
    searchQuery.value = newValue || "";
  }
);

// Click outside to close
const handleClickOutside = (event) => {
  if (props.modelValue && !event.target.closest(".search-overlay")) {
    closeSearch();
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
  searchQuery.value = route.query.search || "";
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <div class="absolute top-17 w-100 right-0 z-40 bg-transparent">
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 transform -translate-y-4"
      enter-to-class="opacity-100 transform translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 transform translate-y-0"
      leave-to-class="opacity-0 transform -translate-y-4"
    >
      <div v-if="modelValue" class="search-overlay" style="top: 80px">
        <div class="search-container">
          <div class="flex items-center p-4">
            <!-- Search Icon -->
            <!-- <Search class="w-5 h-5 text-gray-400 mr-3" /> -->

            <!-- Search Input -->
            <a-input
              ref="searchInput"
              v-model:value="searchQuery"
              @keydown="handleKeydown"
              type="search"
              :placeholder="$t('search.placeholder')"
              class=""
            >
              <template #suffix>
                <span @click="handleSearch" class="cursor-pointer">
                  <Search class="w-5 h-5 text-yellow-500 mr-3" />
                </span>
              </template>
            </a-input>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.search-container {
  width: 400px;
  max-width: 90vw;
  margin: 0 auto;
}

@media (max-width: 640px) {
  .search-container {
    width: 100%;
    max-width: 100%;
    margin: 0 1rem;
  }
}
</style>
