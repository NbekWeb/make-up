<template>
  <a-spin :spinning="loadingUrl.has('site/banners/')">
    <div class="min-h-screen bg-white">
      <Banner />
      <Adds :data="adds" />
      <Popular />
      <Daily />
      <LatestBlog />
      <Partners />
    </div>
  </a-spin>
</template>

<script setup>
import Banner from "@/components/card/Banner.vue";
import Adds from "@/components/home/adds.vue";
import Daily from "@/components/home/daily.vue";
import Popular from '@/components/home/Popular.vue';
import LatestBlog from '@/components/home/LatestBlog.vue';
import Partners from '@/components/home/Partners.vue';
import useMain from "@/stores/main.pinia";
import useCore from "@/stores/core.pinia";
import { onMounted } from "vue";
import { storeToRefs } from "pinia";

const mainStore = useMain();
const coreStore = useCore();

const { loadingUrl } = storeToRefs(coreStore);
const { adds } = storeToRefs(mainStore);

onMounted(() => {
  mainStore.getBanners();
  mainStore.getAdds();
  mainStore.getPartners();
});
</script>

<style scoped>
/* Additional styles if needed */
</style>
