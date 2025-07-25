<template>
  <div
    @click="goToProduct(product.id)"
    v-if="viewMode === 'grid'"
    class="overflow-hidden transition-all duration-300 group"
  >
    <div class="relative overflow-hidden">
      <div
        class="bg-gray-100 h-80 max-lg:h-90 max-sm:h-105 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
      >
        <img
          :src="product.images?.[0]?.image"
          alt="product image"
          class="w-full h-full object-cover"
        />
        <!-- {{ product.images }} -->
      </div>
      <!-- Product Labels -->
      <div class="absolute top-2 left-2 flex space-x-1">
        <span
          v-if="product.is_popular"
          class="bg-yellow-500/80 text-white text-xs px-2 py-1 rounded"
          >{{ $t("product.top") }}</span
        >
        <span
          v-if="product.is_new"
          class="bg-black text-white text-xs px-2 py-1 rounded"
        >
          {{ $t("product.new") }}
        </span>
      </div>
    </div>
    <div class="px-4 pt-3">
      <h3
        class="font-medium text-gray-900 mb-2 truncate"
        :class="color != 'black' && 'text-white'"
      >
        {{ product.translated_name?.[locale] }}
      </h3>
      <!-- Price Section (Hidden on Hover) -->
      <div
        class="flex items-center gap-2 group-hover:scale-0 max-sm:group-hover:scale-100 scale-100 transition-transform duration-500 group-hover:max-h-0 max-sm:group-hover:max-h-full"
      >
        <span
          class="text-sm font-semibold text-gray-900"
          :class="color != 'black' && 'text-white'"
          >{{ product.price }} {{ $t("currency") }}</span
        >
        <!-- <span
          v-if="product.price"
          class="text-sm text-gray-900/70 line-through"
        >
          {{ product.discount_price }} {{ $t("currency") }}
        </span> -->
      </div>
      <div
        class="flex max-h-0 group-hover:max-h-full max-sm:scale-100 items-center justify-between scale-0 group-hover:scale-100 transition-transform duration-300 max-sm:pt-2 max-sm:max-h-full"
      >
        <span
          class="flex items-center gap-1 text-black/80 hover:text-yellow-500 hover:cursor-pointer transition-all duration-300"
          :class="color != 'black' && 'text-white'"
          @click="addToCart(product)"
        >
          <Plus class="w-4 h-4" />
          <span class="text-sm font-medium">{{
            $t("product.add_to_cart")
          }}</span>
        </span>
        <!-- Star Rating -->
        <div class="flex items-center">
          <div class="flex items-center">
            <Star
              v-for="star in 5"
              :key="star"
              :class="[
                'w-3 h-3',
                star <= (product.total_rating == 0 ? 5 : product.total_rating)
                  ? 'text-yellow-500 fill-current'
                  : 'text-yellow-500',
              ]"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="bg-white rounded-lg overflow-hidden">
    <div class="flex">
      <!-- Product Image -->
      <div
        class="w-48 h-48 min-w-48 bg-gray-100 rounded-none flex items-center justify-center relative"
      >
        <img
          :src="product.images?.[0]?.image"
          alt="product image"
          class="w-full h-full object-cover"
        />
        <!-- Product Labels -->
        <div class="absolute top-2 left-2 flex space-x-1">
          <span
            v-if="product.is_popular"
            class="bg-black text-white text-xs px-2 py-1 rounded"
            >{{ $t("product.top") }}</span
          >
          <span
            v-if="product.is_new"
            class="bg-yellow-500/80 text-white text-xs px-2 py-1 rounded"
          >
            {{ $t("product.new") }}
          </span>
        </div>
      </div>
      <!-- Product Details -->
      <div class="flex-1 p-6 max-sm:p-0 max-sm:pl-4">
        <span class="text-xl font-semibold text-gray-900 !mb-2 ">
          {{ product.translated_name?.[locale] }}
        </span>
        <!-- Star Rating -->
        <div class="flex items-center mb-1">
          <div class="flex items-center">
            <Star
              v-for="star in 5"
              :key="star"
              :class="[
                'w-3 h-3',
                star <= product.rating
                  ? 'text-yellow-500 fill-current'
                  : 'text-yellow-500',
              ]"
            />
          </div>
        </div>
        <!-- Price -->
        <div class="flex items-center space-x-2 mb-4 max-sm:mb-1 max-sm:flex-col max-sm:items-start">
          <span class="text-2xl font-bold text-gray-900 max-sm:text-xl"
            >{{ product.price }} {{ $t("currency") }}</span
          >
          <!-- <span
            v-if="product.discount_price"
            class="text-lg text-gray-900/70 line-through max-sm:text-base"
          >
            {{ product.discount_price }} {{ $t("currency") }}
          </span> -->
        </div>
        <!-- Description -->
        <p
          class="text-gray-600 leading-relaxed max-sm:text-sm max-sm:leading-4.5"
        >
          {{ product.description }}
        </p>
        <a-button type="primary" @click="addToCart(product)">
          {{ $t("product.add_to_cart") }}
        </a-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Star, Plus } from "lucide-vue-next";
import { useCart } from "@/stores/cart.pinia";
import { useRouter } from "vue-router";
import useCore from "@/stores/core.pinia";
import { storeToRefs } from "pinia";

const core = useCore();
const { locale } = storeToRefs(core);
const router = useRouter();
const cart = useCart();

function goToProduct(id) {
  router.push({ name: "Product", params: { id } });
}

function addToCart(product) {
  cart.addToCart(product);
}

defineProps({
  product: {
    type: Object,
    required: true,
  },
  viewMode: {
    type: String,
    default: "grid",
  },
  color: {
    type: String,
    default: "black",
  },
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
