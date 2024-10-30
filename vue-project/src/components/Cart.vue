<template>
  <div class="border border-gray-200 p-6 rounded-lg shadow bg-white">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">Giỏ Hàng</h2>
    <div v-if="cartItems.length === 0" class="text-gray-500">
      Giỏ hàng trống.
    </div>
    <div v-else class="max-h-80 overflow-y-auto">
      <table class="w-full text-left">
        <thead>
          <tr class="border-b">
            <th class="py-2">Hình Ảnh</th>
            <th class="py-2">Tên Sản Phẩm</th>
            <th class="py-2">Màu Sắc</th>
            <th class="py-2">Số Lượng</th>
            <th class="py-2">Giá</th>
            <th class="py-2">Thành Tiền</th>
            <th class="py-2">Hành Động</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in cartItems"
            :key="item.product.id + item.color.name"
            class="hover:bg-gray-100"
          >
            <td class="py-2">
              <img
                :src="getProductImage(item)"
                alt="Product Image"
                class="w-16 h-16 object-cover rounded"
              />
            </td>
            <td class="py-2">{{ item.product.name }}</td>
            <td class="py-2">{{ item.color.name }}</td>
            <td class="py-2">{{ item.quantity }}</td>
            <td class="py-2">{{ formatPrice(item.product.price) }}</td>
            <td class="py-2">{{ formatPrice(item.product.price * item.quantity) }}</td>
            <td class="py-2">
              <button
                @click="removeItem(item)"
                class="text-red-500 hover:text-red-700"
                aria-label="Xóa sản phẩm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr class="border-t">
            <td colspan="6" class="text-right font-semibold">Tổng:</td>
            <td class="font-semibold">{{ formatPrice(totalAmount) }}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../stores/cart'
import { formatPrice } from '../utils/formatPrice'
import { storeToRefs } from 'pinia'

const cartStore = useCartStore()
const { cartItems, totalAmount, removeFromCart } = storeToRefs(cartStore)

// Hàm để lấy hình ảnh sản phẩm dựa trên màu sắc đã chọn
const getProductImage = (item) => {
  const colorName = item.color.name.toLowerCase()
  return item.product.images[colorName] || item.product.images.red
}

// Hàm xóa sản phẩm khỏi giỏ hàng
const removeItem = (item) => {
  removeFromCart.value(item)
}
</script>