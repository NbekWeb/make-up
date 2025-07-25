<template>
  <div class="flex py-10 max-sm:py-5 items-center justify-center sm:bg-gray-50">
    <a-card class="w-full max-w-md max-sm:!border-none">
      <h2 class="text-2xl font-bold mb-6 text-center">{{$t('login.title')}}</h2>
      <a-form
        :model="form"
        :rules="rules"
        layout="vertical"
        @submit.prevent="onSubmit"
        autocomplete="off"
      >
        <a-form-item :label="$t('login.email')" name="identifier" :rules="rules.identifier">
          <a-input v-model:value="form.identifier" type="email" :placeholder="$t('login.emailPlaceholder')" />
        </a-form-item>
        <a-form-item :label="$t('login.password')" name="password" :rules="rules.password">
          <a-input-password v-model:value="form.password" :placeholder="$t('login.passwordPlaceholder')" />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" block>{{$t('login.button')}}</a-button>
        </a-form-item>
      </a-form>
      <div class="text-center mt-4">
        <router-link to="/register" class="text-yellow-500 hover:underline">{{$t('login.registerLink')}}</router-link>
      </div>
    </a-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Form, Input, Button, Card, message } from "ant-design-vue";
import { useRouter } from "vue-router";
import useAuth from "@/stores/auth.pinia";
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const auth = useAuth();
const router = useRouter();
const form = ref({
  identifier: "",
  password: "",
});

const rules = {
  identifier: [
    { required: true, message: t('login.emailRequired'), trigger: "blur" },
    { type: "email", message: t('login.emailInvalid'), trigger: "blur" },
    { max: 254, message: t('login.emailMax'), trigger: "blur" },
  ],
  password: [
    { required: true, message: t('login.passwordRequired'), trigger: "blur" },
  ],
};

function onSubmit() {
  // Demo uchun: token saqlash va redirect
  if (form.value.identifier && form.value.password) {
    auth.postLogin(form.value, () => {
      message.success(t('login.success'));
      router.push("/");
    });
  }
}
</script> 