<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import Message from 'primevue/message'

const router = useRouter()
const authStore = useAuthStore()

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const loading = ref(false)

async function handleSignUp() {
  error.value = ''
  
  if (!name.value || !email.value || !password.value || !confirmPassword.value) {
    error.value = 'Please fill in all fields'
    return
  }

  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match'
    return
  }

  if (password.value.length < 6) {
    error.value = 'Password must be at least 6 characters'
    return
  }

  loading.value = true
  
  try {
    const result = authStore.signUp(email.value, password.value, name.value)
    if (result.success) {
      router.push('/products')
    }
  } catch (err) {
    error.value = 'Failed to sign up'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
        <p class="text-gray-600">Sign up to get started</p>
      </div>

      <Message v-if="error" severity="error" :closable="false" class="mb-4">
        {{ error }}
      </Message>

      <form @submit.prevent="handleSignUp" class="space-y-6">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <InputText
            id="name"
            v-model="name"
            type="text"
            placeholder="Enter your full name"
            class="w-full"
            :aria-label="'Name input'"
            :aria-required="true"
          />
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <InputText
            id="email"
            v-model="email"
            type="email"
            placeholder="Enter your email"
            class="w-full"
            :aria-label="'Email input'"
            :aria-required="true"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <Password
            id="password"
            v-model="password"
            placeholder="Enter your password"
            :feedback="true"
            toggleMask
            class="w-full"
            inputClass="w-full"
            :aria-label="'Password input'"
            :aria-required="true"
          />
        </div>

        <div>
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">
            Confirm Password
          </label>
          <Password
            id="confirmPassword"
            v-model="confirmPassword"
            placeholder="Confirm your password"
            :feedback="false"
            toggleMask
            class="w-full"
            inputClass="w-full"
            :aria-label="'Confirm password input'"
            :aria-required="true"
          />
        </div>

        <Button
          type="submit"
          label="Sign Up"
          :loading="loading"
          class="w-full"
          severity="primary"
          :aria-label="'Sign up button'"
        />
      </form>

      <div class="mt-6 text-center">
        <p class="text-gray-600">
          Already have an account?
          <router-link to="/signin" class="text-purple-600 hover:text-purple-700 font-medium">
            Sign In
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>
