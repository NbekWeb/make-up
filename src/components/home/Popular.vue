<script setup>
import { ref, onMounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Heart, ChevronRight } from "lucide-vue-next";
import { useRouter } from "vue-router";
import Product from "@/components/card/Product.vue";
import "swiper/css";
import useProduct from "@/stores/product.pinia";

const router = useRouter();
const product = useProduct();
const products = ref([]);

function goToPopularCatalog() {
  router.push({ name: "Catalog", query: { is_popular: true } });
}

onMounted(() => {
  product.getProducts(
    {
      is_popular: true,
    },
    (data) => {
      products.value = data;
    }
  );
});
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex items-center justify-between mb-4 px-2">
      <div class="flex items-center gap-2">
        <h2 class="text-2xl font-bold text-gray-900">{{ $t('product.popular') }}</h2>
      </div>
      <button
        @click="goToPopularCatalog"
        class="flex items-center gap-1 text-gray-700 hover:text-yellow-500 font-medium group"
      >
        <span class="text-base">{{ $t('blog.all') }}</span>
        <ChevronRight
          class="w-5 h-5 group-hover:translate-x-1 transition-transform"
        />
      </button>
    </div>
    <swiper
      :slides-per-view="5"
      :space-between="20"
      :breakpoints="{
        0: { slidesPerView: 1 },
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 4 },
        1280: { slidesPerView: 5 },
      }"
      class="popular-swiper"
    >
      <swiper-slide v-for="item in products" :key="item.id">
        <Product :product="item" color="black" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<style scoped>
.popular-swiper {
  width: 100%;
}
</style>
