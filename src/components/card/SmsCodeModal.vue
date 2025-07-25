<template>
  <a-modal
    :open="visible"
    :title="$t('sms_code.title')"
    @cancel="handleCancel"
    :footer="null"
  >
    <div class="flex justify-center gap-2 mb-4 mt-5">
      <input
        v-for="(digit, idx) in codeArr"
        :key="idx"
        :ref="(el) => (inputRefs[idx] = el)"
        v-model="codeArr[idx]"
        maxlength="1"
        class="w-10 h-12 text-2xl text-center border rounded focus:outline-none focus:border-yellow-500"
        @input="onInput(idx, $event)"
        @keydown.backspace="onBackspace(idx, $event)"
        inputmode="numeric"
        pattern="[0-9]*"
      />
    </div>
    <div class="flex justify-center pt-5">
      <a-button type="primary" :disabled="!isFull" @click="submitCode">{{
        $t("sms_code.confirm")
      }}</a-button>
    </div>
  </a-modal>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits, nextTick, computed } from "vue";
import useProduct from "@/stores/product.pinia";
import { useCart } from "@/stores/cart.pinia";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const cartStore = useCart();
const productStore = useProduct();
const { cardId } = storeToRefs(productStore);

const props = defineProps({ visible: Boolean });
const emit = defineEmits(["submit", "cancel"]);

const codeArr = ref(["", "", "", "", "", ""]);
const inputRefs = ref([]);

const isFull = computed(() => codeArr.value.every((d) => d.length === 1));

watch(
  () => props.visible,
  (val) => {
    if (val) {
      codeArr.value = ["", "", "", "", "", ""];
      nextTick(() => inputRefs.value[0]?.focus());
    }
  }
);

function onInput(idx, e) {
  let val = e.target.value.replace(/\D/g, "");
  // If pasted a full code
  if (val.length === 6) {
    for (let i = 0; i < 6; i++) {
      codeArr.value[i] = val[i] || "";
    }
    nextTick(() => inputRefs.value[5]?.focus());
    if (isFull.value) submitCode();
    return;
  }
  codeArr.value[idx] = val.slice(0, 1);
  if (val && idx < 5) {
    nextTick(() => inputRefs.value[idx + 1]?.focus());
  }
  if (isFull.value) {
    submitCode();
  }
}
function onBackspace(idx, e) {
  if (!codeArr.value[idx] && idx > 0) {
    nextTick(() => inputRefs.value[idx - 1]?.focus());
  }
}
function submitCode() {
  if (isFull.value) {
    productStore.submitCode(
      { code: codeArr.value.join(""), card_id: cardId.value },
      () => {
        cartStore.setCheckoutModalVisible(true);
        handleCancel();
      }
    );
  }
}
function handleCancel() {
  emit("cancel");
}
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
