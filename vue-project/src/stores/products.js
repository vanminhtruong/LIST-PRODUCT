import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import image1Red from '../assets/images/shoes-red.png'
import image1Blue from '../assets/images/shoes-blue.png'

export const useProductsStore = defineStore('products', () => {
  const defaultProducts = [
    {
      id: 1,
      name: 'Sản phẩm A',
      price: 3333,
      releaseDate: '2021-01-01',
      isBestSeller: true,
      brand: 'BrandX',
      description: 'Mô tả sản phẩm A',
      images: {
        red: image1Red,
        blue: image1Blue,
      },
      colors: [
        { name: 'Red', code: '#FF0000', stock: 10 },
        { name: 'Blue', code: 'blue', stock: 10 },
      ],
    },
    {
      id: 2,
      name: 'Sản phẩm B',
      price: 3333,
      releaseDate: '2021-01-01',
      isBestSeller: true,
      brand: 'BrandX',
      description: 'Mô tả sản phẩm B',
      images: {
        red: image1Red,
        blue: image1Blue,
      },
      colors: [
        { name: 'Red', code: '#FF0000', stock: 10 },
        { name: 'Blue', code: 'blue', stock: 10 },
      ],
    },
    {
      id: 3,
      name: 'Sản phẩm C',
      price: 3333,
      releaseDate: '2021-01-01',
      isBestSeller: true,
      brand: 'BrandX',
      description: 'Mô tả sản phẩm C',
      images: {
        red: image1Red,
        blue: image1Blue,
      },
      colors: [
        { name: 'Red', code: '#FF0000', stock: 10 },
        { name: 'Blue', code: 'blue', stock: 10 },
      ],
    },
    {
      id: 4,
      name: 'Sản phẩm D',
      price: 3333,
      releaseDate: '2021-01-01',
      isBestSeller: true,
      brand: 'BrandX',
      description: 'Mô tả sản phẩm D',
      images: {
        red: image1Red,
        blue: image1Blue,
      },
      colors: [
        { name: 'Red', code: '#FF0000', stock: 10 },
        { name: 'Blue', code: 'blue', stock: 10 },
      ],
    },
  ]

  // Tải dữ liệu sản phẩm từ localStorage nếu có, ngược lại sử dụng dữ liệu mặc định
  const storedProducts = localStorage.getItem('products')
  const products = ref(storedProducts ? JSON.parse(storedProducts) : defaultProducts)

  // Theo dõi sự thay đổi của products và lưu vào localStorage
  watch(products, (newProducts) => {
    localStorage.setItem('products', JSON.stringify(newProducts))
  }, { deep: true })

  return { products }
})