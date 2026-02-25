import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useProductStore = defineStore('products', () => {
  const products = ref([
    {
      id: 1,
      name: 'Wireless Headphones',
      price: 79.99,
      description: 'High-quality wireless headphones with noise cancellation',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
      stock: 15,
      quantity: 0,
      isFavorite: false
    },
    {
      id: 2,
      name: 'Smart Watch',
      price: 199.99,
      description: 'Feature-rich smartwatch with health tracking',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
      stock: 10,
      quantity: 0,
      isFavorite: false
    },
    {
      id: 3,
      name: 'Laptop Stand',
      price: 49.99,
      description: 'Ergonomic aluminum laptop stand',
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',
      stock: 25,
      quantity: 0,
      isFavorite: false
    },
    {
      id: 4,
      name: 'Mechanical Keyboard',
      price: 129.99,
      description: 'RGB backlit mechanical keyboard',
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400',
      stock: 8,
      quantity: 0,
      isFavorite: false
    },
    {
      id: 5,
      name: 'Wireless Mouse',
      price: 39.99,
      description: 'Ergonomic wireless mouse with precision tracking',
      image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400',
      stock: 30,
      quantity: 0,
      isFavorite: false
    },
    {
      id: 6,
      name: 'USB-C Hub',
      price: 59.99,
      description: 'Multi-port USB-C hub with HDMI and SD card reader',
      image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400',
      stock: 20,
      quantity: 0,
      isFavorite: false
    },
    {
      id: 7,
      name: 'Portable Charger',
      price: 34.99,
      description: '20000mAh portable power bank',
      image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400',
      stock: 40,
      quantity: 0,
      isFavorite: false
    },
    {
      id: 8,
      name: 'Phone Case',
      price: 24.99,
      description: 'Durable protective phone case',
      image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400',
      stock: 50,
      quantity: 0,
      isFavorite: false
    },
    {
      id: 9,
      name: 'Bluetooth Speaker',
      price: 89.99,
      description: 'Portable waterproof Bluetooth speaker',
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400',
      stock: 12,
      quantity: 0,
      isFavorite: false
    },
    {
      id: 10,
      name: 'Webcam HD',
      price: 69.99,
      description: '1080p HD webcam with auto-focus',
      image: 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=400',
      stock: 18,
      quantity: 0,
      isFavorite: false
    }
  ])

  const favorites = computed(() => products.value.filter(p => p.isFavorite))
  
  const cart = computed(() => products.value.filter(p => p.quantity > 0))
  
  const cartTotal = computed(() => {
    return cart.value.reduce((total, product) => {
      return total + (product.price * product.quantity)
    }, 0)
  })

  function incrementQuantity(productId) {
    const product = products.value.find(p => p.id === productId)
    if (product && product.quantity < product.stock) {
      product.quantity++
    }
  }

  function decrementQuantity(productId) {
    const product = products.value.find(p => p.id === productId)
    if (product && product.quantity > 0) {
      product.quantity--
    }
  }

  function toggleFavorite(productId) {
    const product = products.value.find(p => p.id === productId)
    if (product) {
      product.isFavorite = !product.isFavorite
    }
  }

  return {
    products,
    favorites,
    cart,
    cartTotal,
    incrementQuantity,
    decrementQuantity,
    toggleFavorite
  }
})
