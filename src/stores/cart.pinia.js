import { defineStore } from "pinia";
import { message } from "ant-design-vue";
// import { useI18n } from 'vue-i18n';

export const useCart = defineStore("cart", {
  state: () => ({
    items: JSON.parse(localStorage.getItem("cart") || "[]"),
    drawerVisible: false, // Drawer holati
    carDetail: false, // Checkout bosilganda true bo'ladi
    submitModal: false, // SMS kod modal uchun
    checkoutModalVisible: false, // Yangi checkout modal uchun
  }),
  getters: {
    cartCount: (state) =>
      state.items.reduce((sum, item) => sum + (item.quantity || 1), 0),
    getCart: (state) => state.items,
  },
  actions: {
    addToCart(product, quantity) {
      // const { t } = useI18n();
      const idx = this.items.findIndex((item) => item.id === product.id);
      if (idx !== -1) {
        this.items[idx].quantity = (this.items[idx].quantity || 1) + quantity;
      } else {
        this.items.push({ ...product, quantity: quantity || 1 });
      }

      localStorage.setItem("cart", JSON.stringify(this.items));
    },
    loadCart() {
      this.items = JSON.parse(localStorage.getItem("cart") || "[]");
    },
    clearCart() {
      this.items = [];
      localStorage.setItem("cart", "[]");
    },
    openDrawer() {
      this.drawerVisible = true;
    },
    closeDrawer() {
      this.drawerVisible = false;
    },
    toggleDrawer() {
      this.drawerVisible = !this.drawerVisible;
    },
    setCarDetailTrue() {
      this.carDetail = true;
    },
    setCarDetailFalse() {
      this.carDetail = false;
    },
    setSubmitModalTrue() {
      this.submitModal = true;
    },
    setSubmitModalFalse() {
      this.submitModal = false;
    },
    setCheckoutModalVisible(val) {
      this.checkoutModalVisible = val;
    },
  },
});
