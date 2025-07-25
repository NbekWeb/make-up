<template>
  <article
    class="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
  >
    <!-- Image Container -->
    <div class="relative h-64 overflow-hidden">
      <img
        :src="post.image"
        :alt="post.title"
        class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
      />
      <!-- Date Badge -->
      <div class="absolute top-4 left-4">
        <span
          class="bg-white text-gray-900 text-sm font-semibold px-3 py-1 rounded"
        >
          {{ formatDate(post.created_at) }}
        </span>
      </div>
    </div>

    <!-- Content -->
    <div class="p-6">
      <!-- Title -->
      <h3 class="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
        {{ post.translated_title?.[locale] }}
      </h3>

      <!-- Meta Info -->
      <div class="flex items-center text-sm text-gray-500 mb-4">
        <Calendar class="w-4 h-4 mr-2" />
        <span>{{ post.publishedDate }}</span>
        <span class="mx-2">•</span>
        <User class="w-4 h-4 mr-2" />
        <span>{{ t("blog.by") }} {{ post.author }}</span>
      </div>

      <!-- Excerpt -->
      <p class="text-gray-600 leading-relaxed mb-4 line-clamp-2 min-h-11.5">
        {{ post.translated_content?.[locale] }}
      </p>

      <!-- Read More Link -->
      <router-link
        :to="`/blog/${post.id}`"
        class="inline-flex items-center hover:!text-yellow-500 font-medium transition-colors"
      >
        {{ t("blog.read_more") }}
        <ArrowRight class="w-4 h-4 ml-1" />
      </router-link>
    </div>
  </article>
</template>

<script setup>
import { Calendar, User, ArrowRight } from "lucide-vue-next";
import { useI18n } from "vue-i18n";
import useCore from "@/stores/core.pinia";
import { storeToRefs } from "pinia";
import dayjs from "dayjs";
import { useRouter } from "vue-router";

const router = useRouter();

const coreStore = useCore();
const { locale } = storeToRefs(coreStore);

const { t } = useI18n();

function formatDate(date) {
  return dayjs(date).format("YYYY-MM-DD");
}

function goToBlog() {
  router.push({ name: "BlogSingle", params: { id: props.id } });
}

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
