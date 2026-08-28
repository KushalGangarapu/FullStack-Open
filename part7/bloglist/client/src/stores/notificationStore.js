import { create } from 'zustand'

let timer = null

export const useNotificationStore = create((set) => ({
  notification: null,
  setNotification: (notification) => set({ notification }),
  clearNotification: () => set({ notification: null }),
  showNotification: (message, type = 'success', durationSeconds = 5) => {
    if (timer) {
      clearTimeout(timer)
    }
    set({ notification: { message, type } })
    timer = setTimeout(() => {
      set({ notification: null })
      timer = null
    }, durationSeconds * 1000)
  },
}))

export default useNotificationStore
