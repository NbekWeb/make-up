<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-2xl mx-auto">
      <!-- Profile Header -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 class="text-2xl font-bold text-gray-800 mb-6">{{$t('profile.title')}}</h1>
        
        <!-- User Info -->
        <div class="space-y-4">
          <div class="flex items-center space-x-4">
            <div class="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
              <span class="text-2xl text-gray-500">
                {{ userInitials }}
              </span>
            </div>
            <div class="flex-1">
              <h2 class="text-xl font-semibold text-gray-800">
                {{ userData.first_name || $t('profile.first_name') }} {{ userData.last_name || $t('profile.last_name') }}
              </h2>
              <p class="text-gray-600">{{ userData.email || $t('profile.email') }}</p>
            </div>
            <a-button type="primary" @click="showEditModal = true">
              {{$t('profile.edit')}}
            </a-button>
          </div>
        </div>
      </div>

      <!-- Actions Section -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">{{$t('profile.settings')}}</h3>
        
        <div class="space-y-4">
          <a-button 
            type="default" 
            size="large" 
            block 
            @click="showPasswordModal = true"
            :loading="coreStore.loadingUrl.has('user')"
          >
            {{$t('profile.change_password')}}
          </a-button>
        </div>
      </div>
    </div>

    <!-- Edit Profile Modal -->
    <a-modal
      v-model:open="showEditModal"
      :title="$t('profile.edit_modal_title')"
      @ok="handleUpdateProfile"
      @cancel="showEditModal = false"
      :confirm-loading="coreStore.loadingUrl.has('user')"
    >
      <a-form :model="editForm" layout="vertical">
        <a-form-item :label="$t('profile.first_name')" name="first_name">
          <a-input 
            v-model:value="editForm.first_name" 
            :placeholder="$t('profile.first_name_placeholder')"
          />
        </a-form-item>
        <a-form-item :label="$t('profile.last_name')" name="last_name">
          <a-input 
            v-model:value="editForm.last_name" 
            :placeholder="$t('profile.last_name_placeholder')"
          />
        </a-form-item>
      </a-form>
    </a-modal>

    <!-- Change Password Modal -->
    <a-modal
      v-model:open="showPasswordModal"
      :title="$t('profile.password_modal_title')"
      @ok="handleChangePassword"
      @cancel="showPasswordModal = false"
      :confirm-loading="coreStore.loadingUrl.has('user')"
    >
      <a-form :model="passwordForm" layout="vertical">
        <a-form-item :label="$t('profile.new_password')" name="new_password">
          <a-input-password 
            v-model:value="passwordForm.new_password" 
            :placeholder="$t('profile.new_password_placeholder')"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { message } from 'ant-design-vue';
import useAuth from '@/stores/auth.pinia';
import useCore from '@/stores/core.pinia';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const authStore = useAuth();
const coreStore = useCore();
const { userData } = storeToRefs(authStore);

// Modal states
const showEditModal = ref(false);
const showPasswordModal = ref(false);

// Form data
const editForm = ref({
  first_name: '',
  last_name: ''
});

const passwordForm = ref({
  new_password: ''
});

// Computed properties
const userInitials = computed(() => {
  const firstName = userData.value.first_name || '';
  const lastName = userData.value.last_name || '';
  return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
});

// Methods
const handleUpdateProfile = () => {
  if (!editForm.value.first_name || !editForm.value.last_name) {
    message.error(t('profile.name_required'));
    return;
  }

  authStore.updateProfile(editForm.value, () => {
    message.success(t('profile.update_success'));
    showEditModal.value = false;
    authStore.getUser(); // Refresh user data
  });
};

const handleChangePassword = () => {
  if (!passwordForm.value.new_password) {
    message.error(t('profile.password_required'));
    return;
  }

  if (passwordForm.value.new_password.length < 6) {
    message.error(t('profile.password_min_length'));
    return;
  }

  authStore.changePassword(passwordForm.value, () => {
    message.success(t('profile.password_update_success'));
    showPasswordModal.value = false;
    passwordForm.value.new_password = '';
  });
};

// Initialize form data when user data is loaded
const initializeEditForm = () => {
  editForm.value = {
    first_name: userData.value.first_name || '',
    last_name: userData.value.last_name || ''
  };
};

// Watch for user data changes
watch(userData, () => {
  initializeEditForm();
}, { immediate: true });


</script>

<style scoped>
.container {
  min-height: calc(100vh - 200px);
}
</style>