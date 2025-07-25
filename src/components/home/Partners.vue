<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { ChevronLeft, ChevronRight } from "lucide-vue-next";
import { Navigation } from "swiper/modules";
import useMain from "@/stores/main.pinia";
import { storeToRefs } from "pinia";

const mainStore = useMain();
const { partners } = storeToRefs(mainStore);

const SwiperNavigation = Navigation;

</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div class="bg-white rounded-lg py-8">
      <div class="relative group">
        <swiper
          :slides-per-view="5"
          :space-between="40"
          :centered-slides="true"
          :loop="true"
          :modules="[SwiperNavigation]"
          :navigation="{
            nextEl: '.partners-swiper-next',
            prevEl: '.partners-swiper-prev',
          }"
          :breakpoints="{
            0: { slidesPerView: 2, spaceBetween: 20, centeredSlides: true },
            640: { slidesPerView: 5, spaceBetween: 40, centeredSlides: true },
          }"
          class="partners-swiper"
        >
          <swiper-slide v-for="item in partners" :key="item.id">
            <a :href="item.link" class="flex items-center justify-center h-24">
              <img
                :src="item.image"
                class="object-contain h-20 w-auto grayscale"
              />
            </a>
          </swiper-slide>
          <template #container-end>
            <button
              class="partners-swiper-prev absolute left-0 top-1/2 -translate-y-1/2 bg-gray-300/80 hover:bg-yellow-500 text-white w-12 h-12 flex items-center justify-center transition-all duration-300 rounded-none z-10 opacity-0 group-hover:opacity-100 max-sm:opacity-100"
              type="button"
            >
              <ChevronLeft class="w-7 h-7" />
            </button>
            <button
              class="partners-swiper-next absolute right-0 top-1/2 -translate-y-1/2 bg-gray-300/80 hover:bg-yellow-500 text-white w-12 h-12 flex items-center justify-center transition-all duration-300 rounded-none z-10 opacity-0 group-hover:opacity-100 max-sm:opacity-100"
              type="button"
            >
              <ChevronRight class="w-7 h-7" />
            </button>
          </template>
        </swiper>
      </div>
    </div>
  </div>
</template>

<style scoped>
.partners-swiper {
  width: 100%;
}
</style>
