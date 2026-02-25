import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('token') || null)

  const isAuthenticated = computed(() => !!token.value)

  function signIn(email, password) {
    const mockUser = {
      id: 1,
      email: email,
      name: email.split('@')[0]
    }
    
    const mockToken = `token_${Date.now()}`
    
    user.value = mockUser
    token.value = mockToken
    localStorage.setItem('token', mockToken)
    localStorage.setItem('user', JSON.stringify(mockUser))
    
    return { success: true, user: mockUser }
  }

  function signUp(email, password, name) {
    const mockUser = {
      id: Date.now(),
      email: email,
      name: name
    }
    
    const mockToken = `token_${Date.now()}`
    
    user.value = mockUser
    token.value = mockToken
    localStorage.setItem('token', mockToken)
    localStorage.setItem('user', JSON.stringify(mockUser))
    
    return { success: true, user: mockUser }
  }

  function signOut() {
    user.value = null
    token.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  function initAuth() {
    const savedToken = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')
    
    if (savedToken && savedUser) {
      token.value = savedToken
      user.value = JSON.parse(savedUser)
    }
  }

  initAuth()

  return {
    user,
    token,
    isAuthenticated,
    signIn,
    signUp,
    signOut
  }
})
