<template>
  <div class="relative h-150 flex items-center">
    <img
      :src="data?.image"
      alt="banner"
      class="absolute top-0 left-0 w-full h-full object-cover"
    />
    <div class="absolute inset-0 bg-black/30 sm:hidden"></div>
    <div class="relative z-10 container mx-auto px-4">
      <div class="max-w-3xl">
        <h2
          class="text-5xl font-bold text-white mb-4 max-lg:text-3xl max-sm:text-2xl"
          data-aos="zoom-in-right"
          data-aos-delay="0"
        >
          {{ data?.translated_title?.[locale] }}
        </h2>
        <p
          class="text-base text-white mb-8 opacity-90 max-sm:text-sm max-sm:mb-4"
          data-aos="zoom-in-right"
          data-aos-delay="200"
        >
          {{ data?.translated_description?.[locale] }}
        </p>
        <a-button
          type="primary"
          size="large"
          data-aos="zoom-in-right"
          data-aos-delay="400"
        >
          {{ $t("home.shop_now") }}
        </a-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import useCore from "@/stores/core.pinia";
import { storeToRefs } from "pinia";

const coreStore = useCore();
const { locale } = storeToRefs(coreStore);

defineProps({
  data: Object,
});
</script>
