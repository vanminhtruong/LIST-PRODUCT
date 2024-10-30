<template>
  <div class="border border-gray-200 p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 flex flex-col">
    <div class="relative">
      <img :src="currentImage" alt="Product Image" class="w-full h-60 object-cover rounded-md" />
      <span
        class="absolute top-2 left-2 px-2 py-1 text-xs font-semibold text-white rounded"
        :class="badgeClass"
      >
        {{ product.isBestSeller ? 'Bán chạy' : 'Bán không chạy' }}
      </span>
    </div>
    <h2 class="mt-4 text-xl font-bold text-gray-800">{{ product.name }}</h2>
    <p class="text-gray-500 mt-1">{{ formattedDate }}</p>
    <p class="mt-2 text-2xl font-semibold text-green-600">{{ formattedPrice }}</p>
    <p class="mt-2 text-gray-700 flex-grow">{{ product.description }}</p>
    
    <div v-if="!allColorsOutOfStock" class="mt-4 flex space-x-2">
      <button
        v-for="color in availableColors"
        :key="color.name"
        :style="{ backgroundColor: color.code }"
        class="w-6 h-6 rounded-full border-2 border-gray-300 focus:outline-none relative"
        @mouseover="changeImage(color)"
        :disabled="color.stock === 0"
        :class="{
          'opacity-50 cursor-not-allowed': color.stock === 0,
          'hover:ring-2 hover:ring-offset-2 hover:ring-blue-500': color.stock > 0
        }"
        :aria-label="color.name"
      >
        <span v-if="color.stock === 0" class="absolute -top-1 -right-1 text-xs text-white">Hết</span>
      </button>
    </div>
    
    <!-- Hiển thị thông báo "Hết hàng" nếu tất cả màu sắc đều hết hàng -->
    <div v-else class="mt-4 text-red-500 font-bold">
      Hết hàng
    </div>
    
    <button
      :disabled="selectedColor.stock === 0 || allColorsOutOfStock"
      @click="addToCart"
      class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:bg-gray-400"
    >
      Thêm vào giỏ
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '../stores/cart'
import { formatDate } from '../utils/formatDate'
import { formatPrice } from '../utils/formatPrice'

const props = defineProps({
  product: Object,
})

const cartStore = useCartStore()

// Lựa chọn màu sắc đầu tiên còn hàng hoặc mặc định
const selectedColor = ref(props.product.colors.find(c => c.stock > 0) || props.product.colors[0])
const currentImage = ref(props.product.images.red)

function changeImage(color) {
  selectedColor.value = color
  currentImage.value = props.product.images[color.name.toLowerCase()]
}

const addToCart = () => {
  cartStore.addToCart(props.product, selectedColor.value)
}

const formattedDate = computed(() => formatDate(props.product.releaseDate))
const formattedPrice = computed(() => formatPrice(props.product.price))
const badgeClass = computed(() =>
  props.product.isBestSeller ? 'bg-red-500' : 'bg-gray-500'
)

// Tính toán các màu sắc còn hàng
const availableColors = computed(() => {
  return props.product.colors.filter(color => color.stock > 0)
})

// Kiểm tra xem tất cả các màu sắc đều hết hàng
const allColorsOutOfStock = computed(() => {
  return availableColors.value.length === 0
})
</script>

<style scoped>
button:disabled {
  cursor: not-allowed;
}
</style>