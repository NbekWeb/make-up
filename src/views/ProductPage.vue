<script setup>
import { ref, onMounted } from "vue";
import { Star, ChevronLeft, ChevronRight } from "lucide-vue-next";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper/modules";
import { useI18n } from "vue-i18n";

import useProduct from "@/stores/product.pinia";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";
import useCore from "@/stores/core.pinia";
import { useCart } from "@/stores/cart.pinia";
import useAuth from "@/stores/auth.pinia";
import { message } from "ant-design-vue";

const route = useRoute();
const router = useRouter();
const productStore = useProduct();
const cart = useCart();
const core = useCore();
const auth = useAuth();
const { product } = storeToRefs(productStore);
const { userData } = storeToRefs(auth);
const { locale } = storeToRefs(core);
const { t } = useI18n();

const selectedImage = ref("");
const selectedColor = ref("");
const quantity = ref(1);
const commentModalVisible = ref(false);
const commentContent = ref("");
const commentRating = ref(5);

const SwiperNavigation = Navigation;

// Narxni so'mda formatlash
function formatPrice(val) {
  const num = Math.round(Number(val));
  return num.toLocaleString("uz-UZ") + " so'm";
}

function handleAddToCart() {
  if (quantity.value > product.value.stock) {
    message.error(t("product.not_enough_stock") || "Yetarli mahsulot yo'q!");
    return;
  } else {
    cart.addToCart(product.value, quantity.value);
    message.success(t("product.add_to_cart"));
  }
}

function handleLeaveComment() {
  const accessToken = localStorage.getItem("access_token");
  if (!accessToken) {
    router.push("/login");
    return;
  }
  commentModalVisible.value = true;
}

function handleSubmitComment() {
  productStore.addComment(
    {
      product: route.params.id,
      content: commentContent.value,
      review_rating: commentRating.value,
      full_name: userData.value.first_name + " " + userData.value.last_name,
    },
    () => {
      commentModalVisible.value = false;
      commentContent.value = "";
      commentRating.value = 5;
      message.success(t("product.comment_success"));
      productStore.getProduct(route.params.id, (data) => {
        product.value = data;
      });
    }
  );
}

function handleCancelComment() {
  commentModalVisible.value = false;
  commentContent.value = "";
  commentRating.value = 5;
}

onMounted(() => {
  productStore.getProduct(route.params.id, (data) => {
    selectedImage.value = data?.images?.[0]?.image;
    selectedColor.value = data?.colors?.[0]?.color;
  });
});
</script>

<template>
  <div class="container mx-auto py-12 max-sm:py-5">
    <div
      class="flex flex-col md:flex-row gap-10 max-sm:gap-5 max-md:container max-md:mx-auto max-md:px-4"
    >
      <div class="flex-1 flex flex-col items-center">
        <div
          class="w-full max-w-xs max-sm:max-w-full h-96 flex items-center justify-center bg-gray-50 rounded-lg mb-4 max-sm:mb-2"
        >
          <img
            :src="selectedImage"
            class="object-cover h-full w-full !border rounded-xl border-yellow-500"
          />
        </div>
        <div class="w-full max-w-xs relative group">
          <swiper
            :modules="[SwiperNavigation]"
            :slides-per-view="3"
            :space-between="12"
            :loop="true"
            :navigation="{
              nextEl: '.thumb-swiper-next',
              prevEl: '.thumb-swiper-prev',
            }"
            class="thumb-swiper"
          >
            <swiper-slide v-for="img in product.images" :key="img">
              <button
                @click="selectedImage = img?.image"
                :class="[
                  'bg-white rounded p-1 w-20 h-20 flex items-center justify-center',
                ]"
              >
                <img
                  :src="img?.image"
                  class="h-16 w-16 object-cover !border border-black/30 rounded"
                />
              </button>
            </swiper-slide>
            <template #container-end>
              <button
                class="thumb-swiper-prev absolute left-0 top-1/2 -translate-y-1/2 bg-gray-300/80 hover:bg-yellow-500 text-white w-8 h-8 flex items-center justify-center transition-all duration-300 rounded z-10 opacity-0 group-hover:opacity-100"
                type="button"
              >
                <ChevronLeft class="w-5 h-5" />
              </button>
              <button
                class="thumb-swiper-next absolute right-0 top-1/2 -translate-y-1/2 bg-gray-300/80 hover:bg-yellow-500 text-white w-8 h-8 flex items-center justify-center transition-all duration-300 rounded z-10 opacity-0 group-hover:opacity-100"
                type="button"
              >
                <ChevronRight class="w-5 h-5" />
              </button>
            </template>
          </swiper>
        </div>
      </div>
      <!-- Right: Info -->
      <div class="flex-1 flex flex-col gap-3">
        <span class="text-2xl font-bold text-gray-900">{{
          product?.translated_name?.[locale]
        }}</span>
        <div class="flex items-center gap-2">
          <div class="flex items-center">
            <Star
              v-for="star in 5"
              :key="star"
              :class="[
                'w-5 h-5',
                star <= (product.total_rating == 0 ? 5 : product.total_rating)
                  ? 'text-yellow-500 fill-current'
                  : 'text-yellow-500',
              ]"
            />
          </div>
        </div>
        <div class="flex items-center gap-4 mb-2">
          <!-- <span class="text-xl font-semibold text-gray-900">
            {{ formatPrice(product.discount_price) }}
          </span> -->
          <span
            v-if="product.price"
            class="text-lg text-gray-900/70 line-through"
          >
            {{ formatPrice(product.price) }}
          </span>
        </div>
        <p class="text-gray-700 mb-4">
          {{ product?.translated_description?.[locale] }}
        </p>
        <div class="flex flex-col gap-4 mb-4">
          <div class="flex flex-col gap-0.5">
            <span class="font-medium">{{ t("product.color") }}</span>
            <div class="flex gap-2 mt-1">
              <button
                v-for="item in product.colors"
                :key="item.id"
                @click="selectedColor = item.color"
                :style="{ backgroundColor: item.color }"
                :class="[
                  selectedColor === item.color ? 'ring-2 ring-yellow-500' : '',
                  'w-7 h-7 rounded border border-gray-300',
                ]"
              ></button>
            </div>
          </div>
          <div class="flex flex-col gap-0.5">
            <span class="font-medium">{{ t("product.quantity") }}</span>
            <input
              type="number"
              v-model="quantity"
              min="1"
              :max="product.stock"
              class="border border-gray-300 rounded px-2 py-1 w-20 ml-2"
            />
          </div>
        </div>
        <div class="flex items-center gap-4">
          <a-button type="primary" @click="handleAddToCart">
            {{ t("product.add_to_cart") }}
          </a-button>
        </div>
      </div>
    </div>

    <!-- Comments Section -->
    <div class="mt-12 max-sm:mt-8">
      <div class="border-t pt-8">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-2">
            <h3 class="text-xl font-semibold text-gray-900">
              {{ t("product.comments") }}
            </h3>
            <span
              class="text-sm text-gray-900/60"
              v-if="product.comment_count > 0"
            >
              {{ `( ${product.comment_count} )` }}
            </span>
          </div>
          <a-button type="primary" @click="handleLeaveComment">
            {{ t("product.leave_comment") }}
          </a-button>
        </div>

        <!-- Comments List -->
        <div v-if="product?.comment_count > 0" class="space-y-4">
          <div
            v-for="comment in product.comment_and_review"
            :key="comment.id"
            class="bg-gray-50 rounded-lg p-4"
          >
            <div class="flex items-start justify-between mb-2">
              <div class="flex items-center gap-2">
                <div
                  class="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                >
                  {{ comment?.full_name?.charAt(0)?.toUpperCase() }}
                </div>
                <span class="font-medium text-gray-900">{{
                  comment?.full_name
                }}</span>
              </div>
              <div class="flex items-center gap-1">
                <Star
                  v-for="star in 5"
                  :key="star"
                  :class="[
                    'w-4 h-4',
                    star <= comment.review_rating
                      ? 'text-yellow-500 fill-current'
                      : 'text-yellow-500',
                  ]"
                />
              </div>
            </div>
            <p class="text-gray-700 mb-2">{{ comment.content }}</p>
            <span class="text-xs text-gray-700/80">
              {{
                new Date(comment.created_at).toLocaleDateString(
                  locale === "uz"
                    ? "uz-UZ"
                    : locale === "ru"
                    ? "ru-RU"
                    : "en-US"
                )
              }}
            </span>
          </div>
        </div>

        <!-- No Comments Message -->
        <div v-else class="text-center py-8">
          <div class="text-gray-900/70 mb-2">
            <svg
              class="w-12 h-12 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              ></path>
            </svg>
          </div>
          <p class="text-gray-900/70">{{ t("product.no_comments") }}</p>
        </div>
      </div>
    </div>

    <!-- Comment Modal -->
    <a-modal
      v-model:open="commentModalVisible"
      :title="t('product.comment_modal_title')"
      @ok="handleSubmitComment"
      @cancel="handleCancelComment"
      :ok-text="t('product.submit_comment')"
      :cancel-text="t('product.cancel')"
    >
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            {{ t("product.comment_rating") }}
          </label>
          <div class="flex items-center gap-1">
            <Star
              v-for="star in 5"
              :key="star"
              @click="commentRating = star"
              :class="[
                'w-6 h-6 cursor-pointer transition-colors',
                star <= commentRating
                  ? 'text-yellow-500 fill-current'
                  : 'text-yellow-500 hover:text-yellow-400',
              ]"
            />
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            {{ t("product.comment_content") }}
          </label>
          <a-textarea
            v-model:value="commentContent"
            :rows="4"
            :placeholder="t('product.comment_content')"
            class="w-full"
          />
        </div>
      </div>
    </a-modal>
  </div>
</template>

<style scoped>
.thumb-swiper {
  width: 100%;
  margin-top: 0.5rem;
}
</style>
