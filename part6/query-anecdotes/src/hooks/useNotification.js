import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

export const useNotificationValue = () => {
  const context = useContext(NotificationContext)
  return context ? context.notification : null
}

export const useNotify = () => {
  const context = useContext(NotificationContext)
  return context ? context.notify : () => {}
}

export default useNotify
