<template>
  <div class="flex flex-col min-h-screen">
    <header class="bg-blue-600 text-white">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <div class="flex items-center space-x-3">
          <svg
            class="w-8 h-8 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 2a8 8 0 100 16 8 8 0 000-16zM7 9a1 1 0 012 0v3a1 1 0 01-2 0V9zm6 0a1 1 0 012 0v3a1 1 0 01-2 0V9z"
            ></path>
          </svg>
          <RouterLink to="/" class="text-2xl font-bold hover:text-gray-200">
            Mini Project
          </RouterLink>
        </div>

        <div>
          <button @click="toggleCart" class="relative cursor-pointer mt-3 ml-[-20px]">
            <svg
              class="w-12 h-12 text-white hover:text-gray-200 transition-colors"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 7M7 13l-2 9m5-9v9m4-9v9m5-9l2 9"
              ></path>
            </svg>
            <span
              v-if="cartItemCount > 0"
              class="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
              {{ cartItemCount }}
            </span>
          </button>
        </div>
      </div>
    </header>

    <main class="flex-grow container mx-auto px-4 py-8">
      <MiniProject />
    </main>

    <footer class="bg-gray-800 text-white">
      <div class="container mx-auto px-4 py-4 text-center">
        <p class="text-sm">&copy; 2023 Mini Project. All rights reserved.</p>
      </div>
    </footer>

    <div
      v-if="isCartVisible"
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      @click.self="toggleCart"
    >
      <div class="bg-white rounded-lg w-11/12 md:w-3/4 lg:w-1/2 p-6 relative">
        <button
          @click="toggleCart"
          class="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <Cart />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import MiniProject from './views/MiniProject.vue'
import { useCartStore } from './stores/cart'
import Cart from './components/Cart.vue'

const cartStore = useCartStore()

const cartItemCount = computed(() => {
  return cartStore.cartItems.reduce((total, item) => total + item.quantity, 0)
})

const isCartVisible = ref(false)

const toggleCart = () => {
  isCartVisible.value = !isCartVisible.value
}
</script>