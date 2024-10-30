<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <ProductItem
      v-for="product in products"
      :key="product.id"
      :product="product"
    />
  </div>
</template>

<script setup>
import { useProductsStore } from '../stores/products'
import ProductItem from './ProductItem.vue'

const store = useProductsStore()
const products = store.products
</script>