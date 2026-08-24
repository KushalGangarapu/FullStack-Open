import { create } from 'zustand'

let currentTimeoutId = null

const useNotificationStore = create((set) => ({
  notification: null,
  actions: {
    setNotification: (message, seconds = 5) => {
      if (currentTimeoutId) {
        clearTimeout(currentTimeoutId)
      }
      set({ notification: message })
      currentTimeoutId = setTimeout(() => {
        set({ notification: null })
        currentTimeoutId = null
      }, seconds * 1000)
    },
    clearNotification: () => {
      if (currentTimeoutId) {
        clearTimeout(currentTimeoutId)
        currentTimeoutId = null
      }
      set({ notification: null })
    },
  },
}))

export const useNotification = () =>
  useNotificationStore((state) => state.notification)
export const useNotificationActions = () =>
  useNotificationStore((state) => state.actions)

export default useNotificationStore
