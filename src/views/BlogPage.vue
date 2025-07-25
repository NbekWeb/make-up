<template>
  <div class="min-h-screen bg-white">
    <div class="container mx-auto px-4 py-8">
      <!-- Page Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          {{$t('latest_blog')}}
        </h1>
        <p class="text-lg text-gray-600 mb-6">
          {{$t('latest_blog_subtitle')}}
        </p>
        <div class="flex justify-center">
          <Leaf class="w-8 h-8 text-green-500" />
        </div>
      </div>

      <!-- Blog Posts Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <BlogCard
          v-for="post in paginatedPosts"
          :key="post.id"
          :post="post"
        />
      </div>

      <!-- Pagination -->
      <div class="flex justify-center mt-12">
        <Pagination
          v-model:current="currentPage"
          :total="totalPosts"
          :page-size="postsPerPage"
          :show-size-changer="false"
          :show-quick-jumper="false"
          :show-total="false"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Leaf } from 'lucide-vue-next'
import { Pagination } from 'ant-design-vue'
import BlogCard from '@/components/blog/BlogCard.vue'

// Pagination data
const currentPage = ref(1)
const postsPerPage = ref(6)

const blogPosts = ref([
  {
    id: 1,
    title: "The History And The Hype",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    date: "17 DEC",
    publishedDate: "Dec 17, 2022",
    author: "Makali",
    category: "Beauty"
  },
  {
    id: 2,
    title: "Best Facial Cream Ever",
    excerpt: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    date: "8 DEC",
    publishedDate: "Dec 8, 2022",
    author: "Makali",
    category: "Skincare"
  },
  {
    id: 3,
    title: "Best Mackup Secret",
    excerpt: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    date: "14 DEC",
    publishedDate: "Dec 14, 2022",
    author: "Makali",
    category: "Makeup"
  },
  {
    id: 4,
    title: "Natural Beauty Tips",
    excerpt: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    date: "21 DEC",
    publishedDate: "Dec 21, 2022",
    author: "Makali",
    category: "Natural"
  },
  {
    id: 5,
    title: "Skincare Routine Guide",
    excerpt: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    date: "28 DEC",
    publishedDate: "Dec 28, 2022",
    author: "Makali",
    category: "Skincare"
  },
  {
    id: 6,
    title: "Makeup Trends 2024",
    excerpt: "Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt.",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    date: "4 JAN",
    publishedDate: "Jan 4, 2023",
    author: "Makali",
    category: "Trends"
  }
])

// Computed properties for pagination
const totalPosts = computed(() => blogPosts.value.length)

const paginatedPosts = computed(() => {
  const startIndex = (currentPage.value - 1) * postsPerPage.value
  const endIndex = startIndex + postsPerPage.value
  return blogPosts.value.slice(startIndex, endIndex)
})
</script> 