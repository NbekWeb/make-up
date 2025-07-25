<template>
  <a-modal
    :open="visible"
    :title="$t('card_detail.title')"
    @ok="handleCardSubmit"
    @cancel="handleCardCancel"
    :ok-text="$t('common.submit')"
    :cancel-text="$t('common.cancel')"
  >
    <a-form :model="cardForm" layout="vertical">
      <a-form-item
        :label="$t('card_detail.card_number')"
        required
        :validate-status="cardNumberError ? 'error' : ''"
        :help="cardNumberError"
      >
        <a-input
          v-model:value="cardForm.card_number"
          :placeholder="$t('card_detail.card_number_placeholder')"
          maxlength="16"
          @input="onCardNumberInput"
          inputmode="numeric"
          pattern="[0-9]*"
          @keypress="onCardNumberKeyPress"
        />
      </a-form-item>

      <a-form-item
        :label="$t('card_detail.expiration_date')"
        required
        :validate-status="expirationDateError ? 'error' : ''"
        :help="expirationDateError"
        class="max-w-max"
      >
        <a-input
          v-model:value="cardForm.expiration_date"
          :placeholder="$t('card_detail.expiration_date_placeholder')"
          maxlength="5"
          @input="onExpirationDateInput"
          inputmode="numeric"
          pattern="[0-9/]*"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from "vue";
import useProduct from "@/stores/product.pinia";
import useAuth from "@/stores/auth.pinia";
import { storeToRefs } from "pinia";
import { useI18n } from 'vue-i18n'
import { useCart } from "@/stores/cart.pinia";
import { message } from "ant-design-vue";

const { t } = useI18n()

const productStore = useProduct();
const authStore = useAuth();
const cartStore = useCart();

const { userData } = storeToRefs(authStore);
const props = defineProps({
  visible: Boolean,
});
const emit = defineEmits(["submit", "cancel"]);

const cardForm = ref({
  card_number: "",
  expiration_date: "",
});
const cardNumberError = ref("");
const expirationDateError = ref("");

watch(
  () => props.visible,
  (val) => {
    if (!val) {
      cardForm.value = {
        card_number: "",
        expiration_date: "",
      };
      cardNumberError.value = "";
      expirationDateError.value = "";
    }
  }
);

function onCardNumberInput(e) {
  let val = e.target.value.replace(/\D/g, "");
  cardForm.value.card_number = val;
}
function onCardNumberKeyPress(e) {
  if (!/[0-9]/.test(e.key)) {
    e.preventDefault();
  }
}
function onExpirationDateInput(e) {
  let val = e.target.value.replace(/[^0-9]/g, "");
  if (val.length > 4) val = val.slice(0, 4);
  if (val.length > 2) val = val.slice(0, 2) + "/" + val.slice(2);
  cardForm.value.expiration_date = val;
  // MM/YY format check
  if (val.length === 5) {
    const [mm, yy] = val.split("/");
    const month = parseInt(mm, 10);
    const year = parseInt(yy, 10) + 2000;
    const now = new Date();
    const thisMonth = now.getMonth() + 1;
    const thisYear = now.getFullYear();
    if (month < 1 || month > 12) {
      expirationDateError.value = t('card_detail.month_invalid');
    } else if (year < thisYear || (year === thisYear && month < thisMonth)) {
      expirationDateError.value = t('card_detail.expired');
    } else {
      expirationDateError.value = "";
    }
  } else {
    expirationDateError.value = "";
  }
}
function handleCardSubmit() {
  if (!cardForm.value.card_number || !cardForm.value.expiration_date) {
    cardNumberError.value =
      cardNumberError.value || t('card_detail.fill_all_fields');
    expirationDateError.value =
      expirationDateError.value || t('card_detail.fill_all_fields');
    return;
  }
  if (cardForm.value.card_number.length < 16) {
    cardNumberError.value = t('card_detail.card_number_length');
    return;
  }
  if (
    !/^\d{2}\/\d{2}$/.test(cardForm.value.expiration_date) ||
    expirationDateError.value
  ) {
    expirationDateError.value =
      expirationDateError.value || t('card_detail.expiration_date_format');
    return;
  }
  // expiration_date ni 1230 formatga o'zgartirib yubor
  const payload = {
    ...cardForm.value,
    expiration_date: cardForm.value.expiration_date.replace("/", ""),
    card_holder: userData.value?.first_name + " " + userData.value?.last_name,
  };
  productStore.createOrderDetail(payload, (data) => {
    productStore.sendCode({ card_id: data.id }, () => {
      message.success(t('card_detail.code_sent'));
      cartStore.setSubmitModalTrue();
      cartStore.setCarDetailFalse();
      handleCardCancel();
    });
  });
}
function handleCardCancel() {
  emit("cancel");
}
</script>
