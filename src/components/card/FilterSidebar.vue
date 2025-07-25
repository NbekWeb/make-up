<template>
  <div class="w-1/3 max-md:w-full">
    <div
      class="bg-gray-200 max-md:bg-transparent md:rounded-lg md:shadow-sm p-6 space-y-6"
    >
      <!-- Filter By Price -->
      <div>
        <h3 class="text-lg font-semibold text-gray-900 !mb-10">
          {{ $t("filter_by_price") }}
        </h3>
        <div class="space-y-4">
          <Slider
            :value="priceRangeValue"
            :min="0"
            :max="10000000"
            range
            class="price-slider"
            @change="handlePriceChange"
          />
          <div class="flex justify-between text-sm text-gray-600">
            <span
              >{{ priceRangeValue[0].toLocaleString() }}
              {{ $t("currency") }}</span
            >
            <span
              >{{ priceRangeValue[1].toLocaleString() }}
              {{ $t("currency") }}</span
            >
          </div>
        </div>
      </div>

      <!-- Categories -->
      <div>
        <h3 class="text-lg font-semibold text-gray-900 mb-4">
          {{ $t("filter.categories") }}
        </h3>
        <div class="flex flex-col gap-2">
          <Checkbox
            v-for="(category, index) in categoriesValue"
            :key="category.name"
            :checked="selectedCategoryIndex === index"
            @change="handleCategoryChange(index)"
            class="ant-checkbox-custom"
          >
            <span class="text-gray-700"
              >{{ category.translated_name?.[locale] }}
            </span>
          </Checkbox>
        </div>
      </div>

      <!-- Color -->
      <div>
        <h3 class="text-lg font-semibold text-gray-900 mb-4">
          {{ $t("filter.color") }}
        </h3>
        <div class="flex flex-col gap-2">
          <Checkbox
            v-for="(color, index) in colorsValue"
            :key="index"
            :checked="selectedColorIndex === index"
            @change="handleColorChange(index)"
            class="ant-checkbox-custom !flex !items-center"
          >
            <div class="flex items-center gap-1">
              <div
                class="w-4 h-4 rounded border border-gray-300"
                :style="{ backgroundColor: color }"
              ></div>
              <span class="text-gray-700">{{ color.name }} </span>
            </div>
          </Checkbox>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { Slider, Checkbox } from "ant-design-vue";
import useMain from "@/stores/main.pinia";
import { storeToRefs } from "pinia";
import useCore from "@/stores/core.pinia";
import { debounce } from "lodash";

const mainStore = useMain();
const core = useCore();
const { locale } = storeToRefs(core);
const { categories, colors } = storeToRefs(mainStore);

// Props
const props = defineProps({
  priceRange: {
    type: Array,
    required: true,
  },
  selectedCategory: {
    type: [String, Number],
    default: "",
  },
  selectedColor: {
    type: [String, Number],
    default: "",
  },
  onPriceChange: {
    type: Function,
    required: true,
  },
  onCategoryChange: {
    type: Function,
    required: true,
  },
  onColorChange: {
    type: Function,
    required: true,
  },
});

const priceRangeValue = ref([...props.priceRange]);
watch(
  () => props.priceRange,
  (val) => {
    priceRangeValue.value = [...val];
  }
);

const debouncedPriceChange = debounce((val) => {
  props.onPriceChange(val);
}, 300);

function handlePriceChange(val) {
  priceRangeValue.value = val;
  debouncedPriceChange(val);
}

const categoriesValue = computed({
  get: () => categories.value,
  set: (value) => emit("update:categories", value),
});

const colorsValue = computed({
  get: () => colors.value,
  set: (value) => emit("update:colors", value),
});

const selectedCategoryIndex = computed(() => {
  return categories.value.findIndex(
    (cat) => cat.id == props.selectedCategory || cat.name == props.selectedCategory
  );
});

function handleCategoryChange(index) {
  const cat = categories.value[index];
  if (cat) {
    if (props.selectedCategory == cat.id || props.selectedCategory == cat.name) {
      props.onCategoryChange("");
    } else {
      props.onCategoryChange(cat.id || cat.name);
    }
  }
}

const selectedColorIndex = computed(() => {
  return colors.value.findIndex(
    (col) => col == props.selectedColor || col.name == props.selectedColor
  );
});

function handleColorChange(index) {
  const col = colors.value[index];
  if (col) {
    if (props.selectedColor == col || props.selectedColor == col.name) {
      props.onColorChange("");
    } else {
      props.onColorChange(col.name || col);
    }
  }
}
</script>

<style scoped>
.price-slider {
  margin: 16px 0;
}
</style>
