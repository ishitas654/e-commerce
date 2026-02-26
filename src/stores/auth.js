import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null)
  const isAuthenticated = computed(() => !!user.value)

  // Helper: Get all users from localStorage
  const getUsers = () => {
    const users = localStorage.getItem('users')
    return users ? JSON.parse(users) : []
  }

  // Helper: Save users to localStorage
  const saveUsers = (users) => {
    localStorage.setItem('users', JSON.stringify(users))
  }

  // Sign Up - Register new user
  function signUp(email, password, name) {
    const users = getUsers()
    
    // Check if user already exists
    if (users.find(u => u.email === email)) {
      return { success: false, error: 'Email already registered' }
    }

    // Create new user
    const newUser = {
      id: Date.now(),
      email,
      name,
      password // In real app, hash this!
    }

    users.push(newUser)
    saveUsers(users)

    // Auto login after signup
    user.value = { id: newUser.id, email: newUser.email, name: newUser.name }
    localStorage.setItem('currentUser', JSON.stringify(user.value))

    return { success: true }
  }

  // Sign In - Login existing user
  function signIn(email, password) {
    const users = getUsers()
    const foundUser = users.find(u => u.email === email && u.password === password)

    if (!foundUser) {
      return { success: false, error: 'Invalid email or password' }
    }
    // Set current user
    user.value = { id: foundUser.id, email: foundUser.email, name: foundUser.name }
    localStorage.setItem('currentUser', JSON.stringify(user.value))

    return { success: true }
  }

  // Sign Out
  function signOut() {
    user.value = null
    localStorage.removeItem('currentUser')
  }

  // Initialize - Check if user is already logged in
  function init() {
    const savedUser = localStorage.getItem('currentUser')
    if (savedUser) {
      user.value = JSON.parse(savedUser)
    }
  }

  // Run init on store creation
  init()

  return {
    user,
    isAuthenticated,
    signIn,
    signUp,
    signOut
  }
})
