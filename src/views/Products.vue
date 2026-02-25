<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useProductStore } from '../stores/products'
import Card from 'primevue/card'
import Button from 'primevue/button'
import Badge from 'primevue/badge'

const router = useRouter()
const authStore = useAuthStore()
const productStore = useProductStore()

const products = computed(() => productStore.products)
const cartTotal = computed(() => productStore.cartTotal)
const cartCount = computed(() => {
  return productStore.cart.reduce((total, item) => total + item.quantity, 0)
})
const favoritesCount = computed(() => productStore.favorites.length)

function handleSignOut() {
  authStore.signOut()
  router.push('/signin')
}

function incrementProduct(productId) {
  productStore.incrementQuantity(productId)
}

function decrementProduct(productId) {
  productStore.decrementQuantity(productId)
}

function toggleFavorite(productId) {
  productStore.toggleFavorite(productId)
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow-md sticky top-0 z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <h1 class="text-2xl font-bold text-indigo-600">
              <i class="pi pi-shopping-cart mr-2"></i>
              E-Commerce Store
            </h1>
          </div>

          <div class="flex items-center space-x-6">
            <div class="flex items-center space-x-4">
              <div class="relative">
                <i class="pi pi-heart text-red-500 text-xl"></i>
                <Badge 
                  v-if="favoritesCount > 0" 
                  :value="favoritesCount" 
                  severity="danger" 
                  class="absolute -top-2 -right-2"
                />
              </div>

              <div class="relative">
                <i class="pi pi-shopping-bag text-indigo-600 text-xl"></i>
                <Badge 
                  v-if="cartCount > 0" 
                  :value="cartCount" 
                  severity="info" 
                  class="absolute -top-2 -right-2"
                />
              </div>
            </div>

            <div class="flex items-center space-x-3">
              <span class="text-gray-700">{{ authStore.user?.name }}</span>
              <Button 
                label="Sign Out" 
                icon="pi pi-sign-out" 
                @click="handleSignOut"
                severity="danger"
                size="small"
                :aria-label="'Sign out button'"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div v-if="cartTotal > 0" class="bg-indigo-100 border border-indigo-200 rounded-lg p-4 mb-6">
        <div class="flex justify-between items-center">
          <span class="text-lg font-semibold text-indigo-900">
            Cart Total: ${{ cartTotal.toFixed(2) }}
          </span>
          <span class="text-sm text-indigo-700">
            {{ cartCount }} item(s) in cart
          </span>
        </div>
      </div>

      <div class="mb-6">
        <h2 class="text-3xl font-bold text-gray-900">Our Products</h2>
        <p class="text-gray-600 mt-2">Browse our collection of premium products</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <Card 
          v-for="product in products" 
          :key="product.id"
          class="hover:shadow-xl transition-shadow duration-300"
        >
          <template #header>
            <div class="relative">
              <img 
                :src="product.image" 
                :alt="product.name"
                class="w-full h-48 object-cover rounded-t-lg"
              />
              <button
                @click="toggleFavorite(product.id)"
                class="absolute top-3 right-3 bg-white rounded-full p-2 shadow-lg hover:scale-110 transition-transform"
                :aria-label="`${product.isFavorite ? 'Remove from' : 'Add to'} favorites`"
              >
                <i 
                  :class="[
                    'pi pi-heart text-xl',
                    product.isFavorite ? 'text-red-500' : 'text-gray-400'
                  ]"
                ></i>
              </button>
              <Badge 
                v-if="product.stock < 10" 
                :value="`Only ${product.stock} left`" 
                severity="warning"
                class="absolute top-3 left-3"
              />
            </div>
          </template>

          <template #title>
            <h3 class="text-lg font-bold text-gray-900 mb-2">{{ product.name }}</h3>
          </template>

          <template #content>
            <p class="text-gray-600 text-sm mb-4">{{ product.description }}</p>
            <div class="flex justify-between items-center mb-4">
              <span class="text-2xl font-bold text-indigo-600">${{ product.price }}</span>
              <span class="text-sm text-gray-500">Stock: {{ product.stock }}</span>
            </div>

            <div class="flex items-center justify-between bg-gray-100 rounded-lg p-3">
              <Button
                icon="pi pi-minus"
                @click="decrementProduct(product.id)"
                :disabled="product.quantity === 0"
                rounded
                text
                severity="secondary"
                size="small"
                :aria-label="`Decrease quantity of ${product.name}`"
              />
              
              <span class="text-lg font-semibold mx-4">{{ product.quantity }}</span>
              
              <Button
                icon="pi pi-plus"
                @click="incrementProduct(product.id)"
                :disabled="product.quantity >= product.stock"
                rounded
                text
                severity="secondary"
                size="small"
                :aria-label="`Increase quantity of ${product.name}`"
              />
            </div>

            <div v-if="product.quantity > 0" class="mt-3 text-center">
              <span class="text-sm font-medium text-green-600">
                Subtotal: ${{ (product.price * product.quantity).toFixed(2) }}
              </span>
            </div>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>
