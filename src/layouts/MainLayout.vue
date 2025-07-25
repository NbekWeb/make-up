<template>
  <div class="min-h-screen bg-white flex flex-col">
    <!-- Top Bar -->
    <TopBar />

    <!-- Navbar -->
    <div class="sticky top-0 z-50 bg-white">
      <Navbar />
    </div>

    <!-- Breadcrumb -->
    <Breadcrumb />

    <!-- Main Content -->
    <main class="flex-1">
      <router-view />
    </main>

    <!-- Footer -->
    <Footer />
    <CartDrawer />
    <CardDetailModal
      :visible="carDetailVisible"
      @submit="handleCardModalSubmit"
      @cancel="handleCardModalCancel"
    />
    <SmsCodeModal
      :visible="submitModal"
      @submit="handleSmsCodeSubmit"
      @cancel="handleSmsCodeCancel"
    />
    <CartCheckoutModal
      :visible="checkoutModalVisible"
      @confirm="handleCheckoutConfirm"
      @cancel="handleCheckoutCancel"
    />
  </div>
</template>

<script setup>
import TopBar from "@/components/main/topBar.vue";
import Navbar from "@/components/main/Navbar.vue";
import Breadcrumb from "@/components/main/Breadcrumb.vue";
import Footer from "@/components/main/Footer.vue";
import CartDrawer from "@/components/card/CartDrawer.vue";
import CardDetailModal from "@/components/card/CardDetailModal.vue";
import SmsCodeModal from "@/components/card/SmsCodeModal.vue";
import CartCheckoutModal from '@/components/card/CartCheckoutModal.vue';
import useAuth from "@/stores/auth.pinia";
import { storeToRefs } from "pinia";
import { onMounted, ref, watch } from "vue";
import { useCart } from "@/stores/cart.pinia";

const authStore = useAuth();
const cartStore = useCart();
const { carDetail, submitModal, checkoutModalVisible } = storeToRefs(cartStore);

const carDetailVisible = ref(false);

watch(carDetail, (val) => {
  carDetailVisible.value = val;
});

function handleCardModalSubmit(cardData) {
  cartStore.carDetail = false;
  // You can handle cardData here (send to API, etc)
}
function handleCardModalCancel() {
  cartStore.carDetail = false;
}

function handleCheckoutConfirm({ phone, address }) {
  cartStore.setCheckoutModalVisible(false);
  cartStore.clearCart();
  // TODO: Send order to backend
}
function handleCheckoutCancel() {
  cartStore.setCheckoutModalVisible(false);
}

function handleSmsCodeSubmit(code) {
  cartStore.submitModal = false;
  // handle code here (API call, etc)
  cartStore.setCheckoutModalVisible(true);
}
function handleSmsCodeCancel() {
  cartStore.submitModal = false;
}
</script>
