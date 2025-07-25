<template>
  <nav class="shadow-md">
    <div class="container mx-auto px-4 relative">
      <div class="flex justify-between items-center py-4">
        <!-- Left side - Logo -->
        <div class="flex items-center">
          <router-link to="/">
            <img
              src="@/assets/img/logo.png"
              alt="logo"
              class="w-auto object-contain h-8 md:h-12.5"
            />
          </router-link>
        </div>

        <!-- Center - Navigation Links (Desktop) -->
        <div class="hidden md:flex items-center space-x-8">
          <router-link
            to="/"
            class="nav-link text-gray-700 hover:text-gray-900 font-medium transition-colors flex items-center space-x-1 relative"
            active-class="text-blue-600"
          >
            <span>{{ $t("navigation.home") }}</span>
          </router-link>

          <router-link
            to="/catalog"
            class="nav-link text-gray-700 hover:text-gray-900 font-medium transition-colors flex items-center space-x-1 relative"
            active-class="text-blue-600"
          >
            <span>{{ $t("navigation.catalog") }}</span>
          </router-link>

          <router-link
            to="/blog"
            class="nav-link text-gray-700 hover:text-gray-900 font-medium transition-colors flex items-center space-x-1 relative"
            active-class="text-blue-600"
          >
            <span>{{ $t("navigation.blog") }}</span>
          </router-link>
        </div>

        <div class="flex items-center space-x-3 md:space-x-4 max-sm:gap-2">
          <div class="" @click.stop="openSearch">
            <Search
              class="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-800 transition-colors"
            />
          </div>

          <!-- Shopping Cart Icon -->
          <div class="relative">
            <ShoppingCart
              class="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-800 transition-colors"
              @click="cart.openDrawer()"
            />
            <span
              class="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium"
            >
              {{ cartCount }}
            </span>
          </div>

          <!-- User/Login Icon -->
          <div class="relative">
            <template v-if="!accessToken">
              <User
                class="w-5 h-5 hover:text-yellow-500 transition-colors duration-300 cursor-pointer"
                @click="goToLogin"
              />
            </template>
            <template v-else>
              <div class="relative">
                <Avatar
                  :size="32"
                  style="background-color: #fde3cf; color: #f56a00"
                  class="cursor-pointer hover:opacity-80 transition-opacity"
                  @click="toggleUserDropdown"
                >
                  {{ userInitial }}
                </Avatar>

                <!-- User Dropdown Menu -->
                <div
                  v-show="isUserDropdownOpen"
                  class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200"
                  ref="userDropdownRef"
                >
                  <router-link
                    to="/profile"
                    @click="closeUserDropdown"
                    class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center space-x-2"
                  >
                    <User class="w-4 h-4" />
                    <span>{{ t('navigation.profile') }}</span>
                  </router-link>

                  <router-link
                    to="/orders"
                    @click="closeUserDropdown"
                    class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center space-x-2"
                  >
                    <ShoppingCart class="w-4 h-4" />
                    <span>{{ t('navigation.orders') }}</span>
                  </router-link>

                  <div class="border-t border-gray-100">
                    <button
                      @click="logout"
                      class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center space-x-2"
                    >
                      <LogOut class="w-4 h-4 text-red-600" />
                      <span>{{ t('common.logout') }}</span>
                    </button>
                  </div>
                </div>
              </div>
            </template>
          </div>

          <!-- Mobile Menu Button -->
          <span class="md:hidden">
            <Hamburger
              v-model="isMobileMenuOpen"
              color="#6B7280"
              class="md:hidden"
            />
          </span>
        </div>
      </div>

      <!-- Mobile Navigation Menu -->
      <div
        v-show="isMobileMenuOpen"
        class="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50"
        ref="mobileMenuRef"
      >
        <div class="container mx-auto px-4 py-4">
          <div class="flex flex-col space-y-4">
            <router-link
              to="/"
              @click="closeMobileMenu"
              class="nav-link-mobile text-gray-700 hover:text-gray-900 font-medium transition-colors py-2 px-4 rounded-md hover:bg-gray-50"
            >
              <span>{{ $t("navigation.home") }}</span>
            </router-link>

            <router-link
              to="/catalog"
              @click="closeMobileMenu"
              class="nav-link-mobile text-gray-700 hover:text-gray-900 font-medium transition-colors py-2 px-4 rounded-md hover:bg-gray-50"
            >
              <span>{{ $t("navigation.catalog") }}</span>
            </router-link>

            <router-link
              to="/blog"
              @click="closeMobileMenu"
              class="nav-link-mobile text-gray-700 hover:text-gray-900 font-medium transition-colors py-2 px-4 rounded-md hover:bg-gray-50"
            >
              <span>{{ $t("navigation.blog") }}</span>
            </router-link>
          </div>
        </div>
      </div>
      <SearchOverlay v-model="isSearchOpen" />
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { Search, ShoppingCart, ChevronDown, LogOut } from "lucide-vue-next";
import Hamburger from "@/components/Hamburger.vue";
import SearchOverlay from "@/components/SearchOverlay.vue";
import { useCart } from "@/stores/cart.pinia";
import { storeToRefs } from "pinia";
import { Avatar } from "ant-design-vue";
import { User } from "lucide-vue-next";
import { useRouter } from "vue-router";
import useAuth from "@/stores/auth.pinia";
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const authStore = useAuth();
const { userData } = storeToRefs(authStore);

const cart = useCart();
const { cartCount } = storeToRefs(cart);

const accessToken = localStorage.getItem("access_token");

const userName = computed(() => {
  return userData.value?.first_name || userData.value?.username || "User";
});

const userInitial = computed(() => {
  return userName.value ? userName.value[0].toUpperCase() : "U";
});
const router = useRouter();

function goToLogin() {
  router.push("/login");
}

const isMobileMenuOpen = ref(false);
const isSearchOpen = ref(false);
const isUserDropdownOpen = ref(false);
const mobileMenuRef = ref(null);
const userDropdownRef = ref(null);

const openSearch = () => {
  isSearchOpen.value = true;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

const toggleUserDropdown = () => {
  isUserDropdownOpen.value = !isUserDropdownOpen.value;
};

const closeUserDropdown = () => {
  isUserDropdownOpen.value = false;
};

const logout = () => {
  localStorage.removeItem("access_token");
  authStore.userData = {};
  closeUserDropdown();
  router.push("/login");
};

// Click outside to close menus
const handleClickOutside = (event) => {
  // Close mobile menu
  if (
    isMobileMenuOpen.value &&
    mobileMenuRef.value &&
    !mobileMenuRef.value.contains(event.target)
  ) {
    const hamburgerButton = event.target.closest(".hamburger");
    if (!hamburgerButton || !hamburgerButton.contains(event.target)) {
      closeMobileMenu();
    }
  }

  // Close user dropdown
  if (
    isUserDropdownOpen.value &&
    userDropdownRef.value &&
    !userDropdownRef.value.contains(event.target)
  ) {
    const avatarButton = event.target.closest(".ant-avatar");
    if (!avatarButton || !avatarButton.contains(event.target)) {
      closeUserDropdown();
    }
  }
};

// Escape key to close menus
const handleEscapeKey = (event) => {
  if (event.key === "Escape") {
    if (isMobileMenuOpen.value) {
      closeMobileMenu();
    }
    if (isUserDropdownOpen.value) {
      closeUserDropdown();
    }
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
  document.addEventListener("keydown", handleEscapeKey);
  
  // Fetch user data if user is logged in
  if (accessToken && !userData.value?.id) {
    authStore.getUser();
  }
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
  document.removeEventListener("keydown", handleEscapeKey);
});
</script>

<style scoped>
.nav-link {
  position: relative;
}

.nav-link::after {
  content: "";
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #101828; /* blue-600 */
  transition: width 0.3s ease-in-out;
}

.nav-link:hover::after {
  width: 100%;
}

/* Active state also shows the border */
.nav-link.router-link-active::after {
  width: 100%;
}

/* Mobile navigation styles */
.nav-link-mobile {
  position: relative;
}

.nav-link-mobile.router-link-active {
  font-weight: 600;
}
</style>
