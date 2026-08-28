import { create } from 'zustand'
import loginService from '../services/login'
import blogService from '../services/blogs'
import persistentUser from '../services/persistentUser'

export const useUserStore = create((set) => ({
  user: null,

  initUser: () => {
    const user = persistentUser.getUser()
    if (user) {
      set({ user })
      blogService.setToken(user.token)
    }
  },

  login: async (credentials) => {
    const user = await loginService.login(credentials)
    persistentUser.saveUser(user)
    blogService.setToken(user.token)
    set({ user })
    return user
  },

  logout: () => {
    persistentUser.removeUser()
    blogService.setToken(null)
    set({ user: null })
  },

  setUser: (user) => {
    if (user) {
      persistentUser.saveUser(user)
      blogService.setToken(user.token)
    } else {
      persistentUser.removeUser()
      blogService.setToken(null)
    }
    set({ user })
  },
}))

export default useUserStore
