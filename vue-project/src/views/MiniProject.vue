<template>
  <div class="space-y-8">
    <h1 class="text-4xl font-extrabold text-center text-gray-800">Danh Sách Sản Phẩm</h1>
    <ProductList />
    <!-- Removed the Cart component from here -->
  </div>
</template>

<script setup>
import ProductList from '../components/ProductList.vue'
import Cart from '../components/Cart.vue'
</script>