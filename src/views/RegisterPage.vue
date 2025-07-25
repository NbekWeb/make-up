<template>
  <div class="flex py-10 max-sm:py-5 items-center justify-center sm:bg-gray-50">
    <a-card class="w-full sm:max-w-md max-sm:!border-none">
      <h2 class="text-2xl font-bold mb-6 text-center">{{$t('register.title')}}</h2>
      <a-form
        :model="form"
        :rules="rules"
        layout="vertical"
        @submit.prevent="onSubmit"
        autocomplete="off"
      >
        <a-form-item :label="$t('register.email')" name="email" :rules="rules.email">
          <a-input
            v-model:value="form.email"
            type="email"
            :placeholder="$t('register.emailPlaceholder')"
          />
        </a-form-item>
        <a-form-item :label="$t('register.first_name')" name="first_name" :rules="rules.first_name">
          <a-input v-model:value="form.first_name" :placeholder="$t('register.first_name_placeholder')" />
        </a-form-item>
        <a-form-item :label="$t('register.last_name')" name="last_name" :rules="rules.last_name">
          <a-input v-model:value="form.last_name" :placeholder="$t('register.last_name_placeholder')" />
        </a-form-item>
        <a-form-item :label="$t('register.password')" name="password" :rules="rules.password">
          <a-input-password v-model:value="form.password" :placeholder="$t('register.password_placeholder')" />
        </a-form-item>
        <a-form-item
          :label="$t('register.password_confirm')"
          name="password_confirm"
          :rules="rules.password_confirm"
        >
          <a-input-password
            v-model:value="form.password_confirm"
            :placeholder="$t('register.password_confirm_placeholder')"
          />
        </a-form-item>
        <a-form-item name="is_agree" :rules="rules.is_agree">
          <a-checkbox v-model:checked="form.is_agree">
            <span>{{$t('register.agree_terms')}}</span>
          </a-checkbox>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" block>
            {{$t('register.button')}}
          </a-button>
        </a-form-item>
      </a-form>
      <div class="text-center mt-4">
        <router-link to="/login" class="text-yellow-500 hover:underline">
          {{$t('register.login_link')}}
        </router-link>
      </div>
    </a-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Form, Input, Button, Card, Checkbox, message } from "ant-design-vue";
import { useRouter } from "vue-router";
import useAuth from "@/stores/auth.pinia";
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const auth = useAuth();
const router = useRouter();
const form = ref({
  email: "",
  first_name: "",
  last_name: "",
  password: "",
  password_confirm: "",
  is_agree: true,
});

const rules = {
  email: [
    { required: true, message: t('register.email_required'), trigger: "blur" },
    { type: "email", message: t('register.email_invalid'), trigger: "blur" },
    { max: 254, message: t('register.email_max'), trigger: "blur" },
  ],
  first_name: [
    { required: true, message: t('register.first_name_required'), trigger: "blur" },
    { max: 30, message: t('register.first_name_max'), trigger: "blur" },
  ],
  last_name: [
    { required: true, message: t('register.last_name_required'), trigger: "blur" },
    { max: 30, message: t('register.last_name_max'), trigger: "blur" },
  ],
  password: [
    { required: true, message: t('register.password_required'), trigger: "blur" },
    { min: 1, message: t('register.password_min'), trigger: "blur" },
  ],
  password_confirm: [
    { required: true, message: t('register.password_confirm_required'), trigger: "blur" },
    { min: 1, message: t('register.password_confirm_min'), trigger: "blur" },
    {
      validator: (rule, value) => value === form.value.password,
      message: t('register.passwords_not_match'),
      trigger: "blur",
    },
  ],
  is_agree: [
    {
      required: true,
      type: "boolean",
      message: t('register.agree_required'),
      trigger: "change",
    },
    {
      validator: (rule, value) => value === true,
      message: t('register.agree_required'),
      trigger: "change",
    },
  ],
};

function onSubmit() {
  // Demo uchun: token saqlash va redirect
  if (
    form.value.email &&
    form.value.first_name &&
    form.value.last_name &&
    form.value.password &&
    form.value.password_confirm === form.value.password &&
    form.value.is_agree
  ) {
    auth.postRegis(form.value, () => {
      auth.postLogin({identifier: form.value.email, password: form.value.password}, () => {
        message.success(t('register.success'));
        router.push("/");
      });
    });
  }
}
</script>
