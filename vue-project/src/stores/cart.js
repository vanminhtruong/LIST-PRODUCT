import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { useProductsStore } from './products' // Import cửa hàng products

export const useCartStore = defineStore('cart', () => {
  const cartItems = ref([])
  const productsStore = useProductsStore() // Khởi tạo cửa hàng products

  // Tải dữ liệu giỏ hàng từ localStorage khi cửa hàng được khởi tạo
  const storedCart = localStorage.getItem('cart')
  if (storedCart) {
    try {
      cartItems.value = JSON.parse(storedCart)
    } catch (e) {
      console.error('Không thể phân tích dữ liệu giỏ hàng từ localStorage:', e)
    }
  }

  function addToCart(product, color) {
    if (color.stock <= 0) {
      alert('Sản phẩm đã hết hàng!')
      return
    }

    const existingItem = cartItems.value.find(
      item => item.product.id === product.id && item.color.name === color.name
    )
    if (existingItem) {
      existingItem.quantity++
    } else {
      cartItems.value.push({
        product,
        color,
        quantity: 1,
      })
    }

    // Giảm số lượng kho của màu sắc đã chọn
    const productInStore = productsStore.products.find(p => p.id === product.id)
    if (productInStore) {
      const colorInStore = productInStore.colors.find(c => c.name === color.name)
      if (colorInStore && colorInStore.stock > 0) {
        colorInStore.stock--
      }
    }
  }

  function removeFromCart(item) {
    const index = cartItems.value.findIndex(
      cartItem => cartItem.product.id === item.product.id && cartItem.color.name === item.color.name
    )
    if (index !== -1) {
      const removedItem = cartItems.value.splice(index, 1)[0]

      // Tăng số lượng kho của màu sắc tương ứng
      const productInStore = productsStore.products.find(p => p.id === removedItem.product.id)
      if (productInStore) {
        const colorInStore = productInStore.colors.find(c => c.name === removedItem.color.name)
        if (colorInStore) {
          colorInStore.stock += removedItem.quantity
        }
      }
    }
  }

  const totalAmount = computed(() => {
    return cartItems.value.reduce((total, item) => {
      const price = Number(item.product.price)
      const quantity = Number(item.quantity)
      return total + price * quantity
    }, 0)
  })

  // Theo dõi sự thay đổi của cartItems và lưu vào localStorage
  watch(cartItems, (newCart) => {
    localStorage.setItem('cart', JSON.stringify(newCart))
  }, { deep: true })

  return { cartItems, addToCart, removeFromCart, totalAmount }
})