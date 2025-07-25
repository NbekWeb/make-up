<script setup>
import useProduct from "@/stores/product.pinia";
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
import dayjs from "dayjs";
import "dayjs/locale/uz";
import "dayjs/locale/ru";
import "dayjs/locale/en";
import useCore from "@/stores/core.pinia";

const { t } = useI18n();
const productStore = useProduct();
const coreStore = useCore();
const { locale } = storeToRefs(coreStore);
const { orders } = storeToRefs(productStore);


dayjs.locale(locale.value || 'en');

onMounted(() => {
  productStore.getOrder();
});
</script>

<template>
  <div class="p-4 container mx-auto">
    <h2 class="text-2xl font-bold !mb-6 text-center">{{ t('order.title') }}</h2>
    <a-row :gutter="[16, 16]" class="mt-8">
      <a-col
        v-for="order in orders"
        :key="order.id"
        :xs="24"
        :sm="24"
        :md="12"
        :lg="8"
      >
        <a-card :body-style="{ padding: '20px', background: order.payment_status === 4 ? '#e6fffa' : '#fff1f0' }" :style="{ border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }">
          <div class="flex flex-col gap-2">
            <div class="flex items-center gap-2">
              <span class="font-semibold">{{ t('order.total_price') }}:</span>
              <span> {{ order.total_price }} </span>
            </div>
            <div class="flex items-center gap-2">
              <span class="font-semibold">{{ t('order.created_at') }}:</span>
              <span> {{ dayjs(order.created_at).locale(locale).format('D-MMMM YYYY') }} </span>
            </div>
            <div class="flex items-center gap-2">
              <span class="font-semibold">{{ t('order.status') }}:</span>
              <a-badge
                :status="order.payment_status === 4 ? 'success' : 'error'"
                :text="order.payment_status === 4 ? t('order.success') : t('order.error')"
              />
            </div>
          </div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
