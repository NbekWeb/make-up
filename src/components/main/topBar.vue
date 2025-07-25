<template>
  <div class="bg-gray-100 py-2">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
        <!-- Left side - Contact Information -->
        <div class="flex items-center space-x-3 md:space-x-6 order-2 md:order-1">
          <div class="flex items-center space-x-2">
            <Phone class="w-4 h-4 text-gray-600" />
            <span class="text-xs md:text-sm text-gray-600 hidden sm:inline">{{ $t('topbar.phone') }}</span>
            <span class="text-xs md:text-sm text-gray-600 sm:hidden">0123456789</span>
          </div>
          <div class="flex items-center space-x-2  md:flex">
            <Mail class="w-4 h-4 text-gray-600" />
            <span class="text-sm text-gray-600">nbekdev@gmail.com</span>
          </div>
        </div>
        
        <!-- Center - Social Media Icons -->
        <div class="flex items-center space-x-2 md:space-x-3 order-1 md:order-2">
          <Facebook class="w-4 h-4 text-gray-600 cursor-pointer hover:text-gray-800 transition-colors" />
          <Rss class="w-4 h-4 text-gray-600 cursor-pointer hover:text-gray-800 transition-colors hidden sm:block" />
          <Twitter class="w-4 h-4 text-gray-600 cursor-pointer hover:text-gray-800 transition-colors" />
          <Youtube class="w-4 h-4 text-gray-600 cursor-pointer hover:text-gray-800 transition-colors hidden md:block" />
          <div class="w-4 h-4 text-gray-600 cursor-pointer hover:text-gray-800 transition-colors flex items-center justify-center hidden lg:flex">
            <span class="text-xs font-bold">{{ $t('topbar.gplus') }}</span>
          </div>
          <Instagram class="w-4 h-4 text-gray-600 cursor-pointer hover:text-gray-800 transition-colors" />
        </div>
        
        <!-- Right side - Dropdown Selectors -->
        <div class="flex items-center space-x-4 order-3">
          <!-- Language Switcher -->
          <LanguageSwitcher />
          
        
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Phone, Mail, Facebook, Rss, Twitter, Youtube, Instagram, ChevronDown } from 'lucide-vue-next'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
</script>

<style scoped>
/* Additional styles if needed */
</style>
