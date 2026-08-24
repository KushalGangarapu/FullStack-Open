import { createContext, useReducer, useRef } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'CLEAR':
      return null
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, dispatch] = useReducer(notificationReducer, null)
  const timeoutRef = useRef(null)

  const notify = (message, seconds = 5) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    dispatch({ type: 'SET', payload: message })
    timeoutRef.current = setTimeout(() => {
      dispatch({ type: 'CLEAR' })
      timeoutRef.current = null
    }, seconds * 1000)
  }

  return (
    <NotificationContext.Provider value={{ notification, notify, dispatch }}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
