<template>
  <a-drawer
    :open="drawerVisible"
    :width="drawerWidth"
    placement="right"
    :closable="true"
    @close="closeDrawer"
    class="max-sm:w-full sm:w-100"
  >
    <template #title>
      <span>{{ $t('cart.title') }}</span>
    </template>
    <div v-if="cartItems.length > 0" class="flex flex-col gap-4">
      <div
        v-for="item in cartItems"
        :key="item.id"
        class="flex items-center gap-4 border-b border-yellow-500 pb-2"
      >
        <img
          :src="item.images?.[0]?.image"
          alt="product image"
          class="w-16 h-16 object-cover rounded border"
        />
        <div class="flex-1">
          <div class="font-semibold line-clamp-1">{{ item.translated_name?.[locale] }}</div>
          <div class="text-gray-900/70 text-xs line-clamp-2 mb-1">
            {{ item.description }}
          </div>
          <div class="text-gray-700 text-sm flex items-center gap-2">
            <a-button
              size="small"
              @click="decrement(item)"
              :disabled="item.quantity <= 0"
              shape="circle"
              >-</a-button
            >
            <span class="mx-2">{{ item.quantity }}</span>
            <a-button size="small" @click="increment(item)" shape="circle"
              >+</a-button
            >
            <span class="ml-3">{{ formatPrice(item.price) }}</span>
          </div>
        </div>
        <div class="flex flex-col items-end gap-2">
          <div class="font-bold whitespace-nowrap">
            {{ formatPrice(item.price * item.quantity) }}
          </div>
          <a-button type="text" danger size="small" @click="removeItem(item)" class="p-0">
            <Trash2 class="w-5 h-5" />
          </a-button>
        </div>
      </div>
      <div class="mt-4 flex justify-between items-center font-bold text-lg">
        <span>{{ $t('cart.total') }}:</span>
        <span>{{ formatPrice(totalPrice) }}</span>
      </div>
      <div class="flex gap-4">
        <a-button danger block class="" @click="clearCart"
          >{{ $t('cart.clear_all') }}</a-button
        >
        <a-button type="primary" block class="" @click="checkout"
          >{{
          $t('cart.checkout')
        }}</a-button>
      </div>
    </div>
    <div v-else class="flex flex-col items-center justify-center py-16">
      <a-empty :description="$t('cart.empty')" />
    </div>
   
  </a-drawer>
</template>

<script setup>
import { computed } from "vue";
import { useCart } from "@/stores/cart.pinia";
import { storeToRefs } from "pinia";
import { Drawer, Button, Empty } from "ant-design-vue";
import { Trash2 } from "lucide-vue-next";
import { useRouter } from "vue-router";

const router = useRouter();
const cart = useCart();
const { drawerVisible, items } = storeToRefs(cart);

const drawerWidth = computed(() => (window.innerWidth <= 640 ? "100vw" : 500));

const cartItems = computed(() => items.value);
const totalPrice = computed(() => {
  return cartItems.value.reduce(
    (sum, item) => sum + parseFloat(item.price) * (item.quantity || 1),
    0
  );
});

function closeDrawer() {
  cart.closeDrawer();
}

function formatPrice(val) {
  const num = Math.round(Number(val));
  return num.toLocaleString("uz-UZ") + " so'm";
}

function increment(item) {
  item.quantity = (item.quantity || 1) + 1;
  cart.items = [...cart.items];
  localStorage.setItem("cart", JSON.stringify(cart.items));
}

function decrement(item) {
  if ((item.quantity || 1) <= 1) {
    // Remove item
    cart.items = cart.items.filter((i) => i.id !== item.id);
  } else {
    item.quantity = (item.quantity || 1) - 1;
  }
  cart.items = [...cart.items];
  localStorage.setItem("cart", JSON.stringify(cart.items));
}

function removeItem(item) {
  cart.items = cart.items.filter((i) => i.id !== item.id);
  cart.items = [...cart.items];
  localStorage.setItem("cart", JSON.stringify(cart.items));
}

function clearCart() {
  cart.clearCart();
}

function checkout() {
  const accessToken = localStorage.getItem("access_token");
  if (!accessToken) {
    closeDrawer();
    router.push("/login");
    return;
  }
  closeDrawer();
  cart.setCarDetailTrue();
}


const locale = localStorage.getItem("locale") || "uz";
</script>

<style scoped>
.line-clamp-1 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
