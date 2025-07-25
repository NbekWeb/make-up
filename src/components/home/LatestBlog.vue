<script setup>
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { ChevronRight } from "lucide-vue-next";
import { useRouter } from "vue-router";
import BlogCard from "@/components/blog/BlogCard.vue";
import "swiper/css";
import useMain from "@/stores/main.pinia";
import { storeToRefs } from "pinia";
import useCore from "@/stores/core.pinia";

const router = useRouter();

const mainStore = useMain();
const coreStore = useCore();
const { locale } = storeToRefs(coreStore);
const { blogs } = storeToRefs(mainStore);

function goToBlog() {
  router.push({ name: "Blog" });
}
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex items-center justify-between mb-4 px-2">
      <div class="flex items-center gap-2">
        <h2 class="text-2xl font-bold text-gray-900">
          {{ $t("blog.latest_blog") }}
        </h2>
      </div>
      <button
        @click="goToBlog"
        class="flex items-center gap-1 text-gray-700 hover:text-yellow-500 font-medium group"
      >
        <span class="text-base max-sm:hidden">{{ $t("blog.all") }}</span>
        <ChevronRight
          class="w-5 h-5 group-hover:translate-x-1 transition-transform"
        />
      </button>
    </div>
    <swiper
      :slides-per-view="3"
      :space-between="20"
      :breakpoints="{
        0: { slidesPerView: 1 },
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }"
      class="blog-swiper"
    >
      <swiper-slide v-for="item in blogs.slice(0, 3)" :key="item.id">
        <div class="p-2">
          <BlogCard :post="item" />
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<style scoped>
.blog-swiper {
  width: 100%;
}
</style>
