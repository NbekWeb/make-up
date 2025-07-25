<template>
  <div class="relative banner-swiper group">
    <swiper
      :modules="[SwiperAutoplay, SwiperPagination, SwiperNavigation]"
      :slides-per-view="1"
      :loop="true"
      :autoplay="{
        delay: 5000,
        disableOnInteraction: false,
      }"
      :pagination="{
        clickable: true,
        bulletClass: 'swiper-pagination-bullet',
        bulletActiveClass: 'swiper-pagination-bullet-active',
      }"
      :navigation="{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }"
      @slideChange="onSwiperSlideChange"
    >
      <swiper-slide v-for="(slide, idx) in banners" :key="idx">
        <BannerCard
          v-if="activeIndex === idx"
          :data="slide"
          :key="activeIndex"
        />
      </swiper-slide>

      <div
        class="swiper-button-prev group-hover:!translate-x-0 !flex hover:!bg-yellow-500/80 !-translate-x-100 duration-300 !text-white !w-12 !h-12 !bg-gray-500/20 !rounded-full !items-center !justify-center hover:!bg-opacity-50 transition-all"
      >
        <LeftOutlined class="text-2xl" />
      </div>
      <div
        class="swiper-button-next group-hover:translate-x-0 !text-white !w-12 !h-12 translate-x-100 !bg-gray-500/20 hover:!bg-yellow-500/80 !rounded-full !flex duration-1000 !items-center !justify-center hover:!bg-opacity-50 transition-all"
      >
        <RightOutlined class="text-2xl" />
      </div>
    </swiper>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { ChevronRight } from "lucide-vue-next";
import { LeftOutlined, RightOutlined } from "@ant-design/icons-vue";
import { Button as AButton } from "ant-design-vue";
import AOS from "aos";
import { ref, onMounted } from "vue";
import BannerCard from "./BannerCard.vue";
import useMain from "@/stores/main.pinia";
import useCore from "@/stores/core.pinia";
import { storeToRefs } from "pinia";

// Import Swiper styles

const mainStore = useMain();
const coreStore = useCore();

const { banners } = storeToRefs(mainStore);

const SwiperAutoplay = Autoplay;
const SwiperPagination = Pagination;
const SwiperNavigation = Navigation;

const activeIndex = ref(0);

const onSwiperSlideChange = (swiper) => {
  activeIndex.value = swiper.realIndex;
  setTimeout(() => {
    AOS.refresh();
  }, 10);
};

// If you want to refresh on mount as well:
onMounted(() => {
  AOS.refresh();
});
</script>

<style scoped>
:deep(.swiper-pagination-bullet) {
  width: 12px;
  height: 12px;
  background: rgba(255, 255, 255, 0.5);
  opacity: 1;
}

:deep(.swiper-pagination-bullet-active) {
  background: #c7b270;
  width: 32px;
  border-radius: 10px;
}

:deep(.swiper-button-prev),
:deep(.swiper-button-next) {
  color: white;
}

:deep(.swiper-button-prev::after),
:deep(.swiper-button-next::after) {
  display: none;
}
</style>
