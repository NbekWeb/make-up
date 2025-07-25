<template>
  <div id="app">
    <a-config-provider
      :theme="{
        token: {
          colorPrimary: '#c7b270',
          colorLink: '#c7b270',
          colorLinkHover: '#b39a5e',
          colorLinkActive: '#a68c4d',
          colorInfo: '#c7b270',
          colorPrimaryHover: '#b39a5e',
          colorPrimaryActive: '#a68c4d',
          colorBorder: '#c7b270',
          colorPrimaryBorder: '#c7b270',
          colorPrimaryBg: '#f9f6ef',
        },
      }"
    >
      <router-view />
    </a-config-provider>
  </div>
</template>
<script setup>
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "aos/dist/aos.css";
import { ConfigProvider } from "ant-design-vue";
</script>
