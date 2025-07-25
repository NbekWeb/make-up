<script setup>
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { ChevronRight } from "lucide-vue-next";
import { useRouter } from "vue-router";
import BlogCard from "@/components/blog/BlogCard.vue";
import "swiper/css";

const router = useRouter();

const blogs = ref([
  {
    id: 1,
    title: "5 ta go'zallik sirlari",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    date: "2024-06-01",
    publishedDate: "June 1, 2024",
    author: "Admin",
    excerpt: "Go'zallik uchun eng yaxshi 5 ta maslahat va sirlari bilan tanishing...",
  },
  {
    id: 2,
    title: "Yozgi teri parvarishi",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
    date: "2024-05-28",
    publishedDate: "May 28, 2024",
    author: "Admin",
    excerpt: "Yozda terini qanday parvarish qilish kerakligi haqida to'liq qo'llanma...",
  },
  {
    id: 3,
    title: "Soch uchun tabiiy niqoblar",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
    date: "2024-05-20",
    publishedDate: "May 20, 2024",
    author: "Admin",
    excerpt: "Sochni mustahkamlash uchun uy sharoitida tayyorlanadigan niqoblar...",
  },
  {
    id: 4,
    title: "Qanday qilib to'g'ri makiyaj qilish kerak?",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    date: "2024-05-15",
    publishedDate: "May 15, 2024",
    author: "Admin",
    excerpt: "Boshlovchilar uchun oddiy va samarali makiyaj qoidalari...",
  },
  {
    id: 5,
    title: "Sog'lom ovqatlanish asoslari",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    date: "2024-05-10",
    publishedDate: "May 10, 2024",
    author: "Admin",
    excerpt: "Sog'lom ovqatlanish va go'zallik o'rtasidagi bog'liqlik haqida...",
  },
]);

function goToBlog() {
  router.push({ name: "Blog" });
}
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex items-center justify-between mb-4 px-2">
      <div class="flex items-center gap-2">
        <h2 class="text-2xl font-bold text-gray-900">{{ $t('blog.latest_blog') }}</h2>
      </div>
      <button
        @click="goToBlog"
        class="flex items-center gap-1 text-gray-700 hover:text-yellow-500 font-medium group"
      >
        <span class="text-base">{{ $t('blog.all') }}</span>
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
      <swiper-slide v-for="item in blogs" :key="item.id">
        <BlogCard :post="item" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<style scoped>
.blog-swiper {
  width: 100%;
}
</style> 