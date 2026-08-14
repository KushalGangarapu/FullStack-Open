const Notification = ({ notification }) => {
  if (!notification || !notification.message) {
    return null
  }

  const { message, type } = notification

  return (
    <div className={`notification ${type}`}>
      {message}
    </div>
  )
}

export default Notification
