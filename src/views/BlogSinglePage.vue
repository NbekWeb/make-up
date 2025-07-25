<template>
  <div class="min-h-screen bg-white">
    <div class="container mx-auto px-4 py-8">
      <div class="mb-8">
        <!-- <button @click="goBack" class="text-blue-500 hover:underline mb-4 flex items-center">
          <span class="material-icons mr-1">arrow_back</span>
          {{ t('back') }}
        </button> -->
        <h3
          class="text-3xl font-bold text-gray-900 mb-2 text-center max-sm:text-2xl"
        >
          {{ blog?.translated_title?.[locale] }}
        </h3>

        <img
          v-if="blog?.image"
          :src="blog.image"
          class="w-full max-w-2xl mx-auto rounded-lg mb-6"
        />
        <p class="max-sm:text-sm">{{ blog?.translated_content?.[locale] }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import useMain from "@/stores/main.pinia";
import { storeToRefs } from "pinia";
import useCore from "@/stores/core.pinia";

const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const mainStore = useMain();
const coreStore = useCore();
const { locale } = storeToRefs(coreStore);
const { blog } = storeToRefs(mainStore);

function goBack() {
  router.back();
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString(locale.value);
}

onMounted(() => {
  const id = route.params.id;
  mainStore.getBlog(id);
});
</script>
