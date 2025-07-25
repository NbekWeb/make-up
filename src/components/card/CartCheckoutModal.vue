<template>
  <a-modal
    :open="visible"
    :title="$t('cart.checkout')"
    @ok="handleConfirm"
    @cancel="handleCancel"
    :ok-text="$t('common.confirm')"
    :cancel-text="$t('common.cancel')"
    width="400px"
  >
    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          {{ $t("cart.phone") }}
        </label>
        <a-input
          v-model:value="phone"
          :placeholder="$t('cart.phone_placeholder')"
          @input="onPhoneInput"
          maxlength="19"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          {{ $t("cart.address") }}
        </label>
        <a-textarea
          v-model:value="address"
          :rows="3"
          :placeholder="$t('cart.address_placeholder')"
        />
      </div>
      <div class="flex flex-col gap-2 border-t pt-4">
        <div
          v-for="item in cartItems"
          :key="item.id"
          class="flex justify-between text-sm"
        >
          <span>{{ item.translated_name?.[locale] }} x{{ item.quantity }}</span>
          <span>{{ formatPrice(item.price * item.quantity) }}</span>
        </div>
        <div class="flex justify-end font-bold text-lg mt-2">
          <span>{{ $t("cart.total") }}: {{ formatPrice(totalPrice) }}</span>
        </div>
      </div>
    </div>
  </a-modal>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits } from 'vue';
import { useCart } from '@/stores/cart.pinia';
import useProduct from '@/stores/product.pinia';
import { storeToRefs } from 'pinia';
import useAuth from '@/stores/auth.pinia';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuth();
const productStore = useProduct();

const { userData } = storeToRefs(authStore);

const props = defineProps({
  visible: Boolean,
});
const emit = defineEmits(['confirm', 'cancel']);

const cart = useCart();
const { items } = storeToRefs(cart);
const locale = localStorage.getItem('locale') || 'uz';

const phone = ref('');
const address = ref('');

const cartItems = computed(() => items.value);
const totalPrice = computed(() => {
  return cartItems.value.reduce(
    (sum, item) => sum + parseFloat(item.price) * (item.quantity || 1),
    0
  );
});

function formatPrice(val) {
  const num = Math.round(Number(val));
  return num.toLocaleString('uz-UZ') + ' so\'m';
}

function onPhoneInput(e) {
  let val = e.target.value.replace(/\D/g, '');
  if (val.startsWith('998')) val = val.slice(3);
  if (val.length > 9) val = val.slice(0, 9);
  let formatted = '+998 ';
  if (val.length > 1) {
    formatted += '(' + val.slice(0, 2);
    if (val.length >= 2) formatted += ') ';
    if (val.length > 2) formatted += val.slice(2, 5);
    if (val.length > 5) formatted += '-' + val.slice(5, 7);
    if (val.length > 7) formatted += '-' + val.slice(7, 9);
  } else {
    formatted += '(' + val;
  }
  phone.value = formatted;
}

function handleConfirm() {
  const product_list = cartItems.value.map(item => ({
    product_id: item.id,
    quantity: item.quantity
  }));
  const full_name = (userData.value?.first_name || '') + ' ' + (userData.value?.last_name || '');
  productStore.createOrder({
    phone: phone.value,
    address: address.value,
    product_list,
    full_name
  }, () => {
    router.push('/order');
    handleCancel();
  });
}
function handleCancel() {
  emit('cancel');
}
</script>

<style scoped></style>
