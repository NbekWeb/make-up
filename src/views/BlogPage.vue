<template>
  <div class="min-h-screen bg-white">
    <div class="container mx-auto px-4 py-8">
      <!-- Page Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4 max-sm:text-2xl">
          {{$t('latest_blog')}}
        </h1>
        <p class="text-lg text-gray-600 mb-6 max-sm:text-sm max-sm:!mb-3">
          {{$t('latest_blog_subtitle')}}
        </p>
        <!-- <div class="flex justify-center">
          <Leaf class="w-8 h-8 text-green-500" />
        </div> -->
      </div>

      <!-- Blog Posts Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <BlogCard
          v-for="post in blogs"
          :key="post.id"
          :post="post"
        />
      </div>

      <!-- Pagination -->
      <!-- <div class="flex justify-center mt-12">
        <Pagination
          v-model:current="currentPage"
          :total="blogs.length"
          :page-size="postsPerPage"
          :show-size-changer="false"
          :show-quick-jumper="false"
          :show-total="false"
        />
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { ref, computed,onMounted } from 'vue'
import { Leaf } from 'lucide-vue-next'
import { Pagination } from 'ant-design-vue'
import BlogCard from '@/components/blog/BlogCard.vue'
import useMain from '@/stores/main.pinia'
import { storeToRefs } from 'pinia'
import useCore from '@/stores/core.pinia'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const mainStore = useMain();
const coreStore = useCore();

const { locale } = storeToRefs(coreStore);
const { blogs } = storeToRefs(mainStore);

// Pagination data
const currentPage = ref(1)
const postsPerPage = ref(6)



// Computed properties for pagination
// const totalPosts = computed(() => blogPosts.value.length)

onMounted(() => {
  mainStore.getBlogs();
})
</script> 