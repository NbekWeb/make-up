<template>
  <footer class="bg-gray-800 text-white">
    <div class="container mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Company Info -->
        <div>
          <img
            src="/src/assets/img/logo.png"
            alt="logo"
            class="w-auto h-20 mb-4 object-contain"
          />
          <p class="text-gray-300 mb-4">
            {{$t('footer.company_info')}}
          </p>
          <div class="flex space-x-4">
            <a
              href="#"
              class="text-gray-300 hover:text-white transition-colors"
            >
              <Facebook class="w-5 h-5" />
            </a>
            <a
              href="#"
              class="text-gray-300 hover:text-white transition-colors"
            >
              <Instagram class="w-5 h-5" />
            </a>
            <a
              href="#"
              class="text-gray-300 hover:text-white transition-colors"
            >
              <Twitter class="w-5 h-5" />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="text-lg font-semibold mb-4">{{$t('footer.quick_links')}}</h4>
          <ul class="space-y-2">
            <li>
              <router-link
                to="/catalog"
                class="text-gray-300 hover:text-white transition-colors"
                >{{$t('footer.our_products')}}</router-link
              >
            </li>
            <li>
              <router-link
                to="/blog"
                class="text-gray-300 hover:text-white transition-colors"
                >{{$t('footer.blog')}}</router-link
              >
            </li>
          </ul>
        </div>

        <!-- Customer Service -->
        <div>
          <h4 class="text-lg font-semibold mb-4">{{$t('footer.customer_service')}}</h4>
          <ul class="space-y-2">
         
           
            <li>
              <a
                href="#"
                class="text-gray-300 hover:text-white transition-colors"
                >{{$t('footer.support')}}</a
              >
            </li>
          </ul>
        </div>

      
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-gray-700 mt-8 pt-8 text-center">
        <p class="text-gray-300">© 2025 SeedBee. {{$t('footer.all_rights_reserved')}}</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { Facebook, Instagram, Twitter } from "lucide-vue-next";
</script>

<style scoped>
/* Additional styles if needed */
</style>
