<script setup>
import { storeToRefs } from "pinia";
import useCore from "@/stores/core.pinia";
const coreStore = useCore();
const { locale } = storeToRefs(coreStore);

defineProps({
  data: {
    type: Array,
    required: true,
  },
});
</script>
<template>
  <div
    class="px-4 container mx-auto grid grid-cols-3 mt-10 gap-10 max-lg:grid-cols-2 max-sm:grid-cols-1 max-md:gap-5 max-lg:mt-5"
  >
    <div
      v-for="item in data"
      :key="item.id"
      class="h-45 relative overflow-hidden group hover:cursor-pointer"
    >
      <img
        :src="item.image"
        alt="add"
        class="h-full w-full object-cover absolute top-0 left-0 transition-transform duration-500 group-hover:scale-110"
      />
      <span
        class="absolute bottom-0 left-0 text-white text-sm font-bold pb-3 px-5 truncate max-w-full"
      >
        {{ item.translated_title?.[locale] }}
      </span>
    </div>
  </div>
</template>

<style scoped></style>
