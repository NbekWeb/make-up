<script setup>
import { ref, onMounted } from "vue";
import useProduct from "@/stores/product.pinia";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Product from "@/components/card/Product.vue";
import { ChevronLeft, ChevronRight } from "lucide-vue-next";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const productdata = ref([]);
const productStore = useProduct();

productStore.getCategoryProduc({}, (data) => {
  productdata.value = data;
});

const SwiperAutoplay = Autoplay;
const SwiperNavigation = Navigation;

const products = ref([]);

onMounted(() => {
  productStore.getCategoryProduc(
    {
      is_new: true,
    },
    (data) => {
      products.value = data;
    }
  );
});
</script>
<template>
  <div
    class="relative w-full min-h-full py-25 flex items-center justify-center bg-cover bg-center mt-20 max-sm:py-15 max-sm:bg-left"
    style="background-image: url('/src/assets/img/daily-bg.webp')"
  >
    <div class="container mx-auto px-4 flex justify-end max-sm:justify-start">
      <div class="max-w-140 relative max-sm:max-w-full">
        <h2 class="text-3xl font-bold text-white mb-6 drop-shadow-lg">
          {{ t("home.daily_deals") }}
        </h2>
        <div class="relative">
          <swiper
            :modules="[SwiperAutoplay, SwiperNavigation]"
            :slides-per-view="2"
            :space-between="30"
            :loop="true"
            :autoplay="{ delay: 4000, disableOnInteraction: false }"
            :navigation="{
              nextEl: '.daily-swiper-next',
              prevEl: '.daily-swiper-prev',
            }"
            :breakpoints="{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
            }"
            class="product-swiper group"
          >
            <swiper-slide v-for="item in products" :key="item.id">
              <Product :product="item" :color="'white'" />
            </swiper-slide>
            

            <!-- Custom Navigation Buttons -->
            <template #container-end>
              <div
                class="absolute top-35 max-sm:top-50 hidden max-sm:flex group-hover:flex left-0 w-full transition-all duration-300 justify-between gap-4 -translate-y-1/2 z-10"
              >
                <button
                  class="daily-swiper-prev bg-gray-500 hover:bg-yellow-500 text-gray-700 hover:text-white w-10 h-10 flex items-center justify-center shadow transition-all duration-300"
                >
                  <ChevronLeft class="w-4 h-4" />
                </button>
                <button
                  class="daily-swiper-next bg-white/80 hover:bg-yellow-500 text-gray-700 hover:text-white w-10 h-10 flex items-center justify-center shadow transition-all duration-300"
                >
                  <ChevronRight class="w-4 h-4" />
                </button>
              </div>
            </template>
          </swiper>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-swiper {
  width: 100%;
  padding-bottom: 40px;
}
</style>
