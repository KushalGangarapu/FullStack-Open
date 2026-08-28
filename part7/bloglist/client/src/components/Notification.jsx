import { Alert, Box } from '@mui/material'
import PropTypes from 'prop-types'
import { useNotificationStore } from '../stores/notificationStore'

const Notification = ({ notification: propNotification }) => {
  const storeNotification = useNotificationStore((state) => state.notification)
  const notification = propNotification !== undefined ? propNotification : storeNotification

  if (!notification || !notification.message) {
    return null
  }

  const { message, type } = notification
  const severity = type === 'error' ? 'error' : 'success'

  return (
    <Box sx={{ my: 2 }} className={`notification notification-${type}`} data-testid="notification">
      <Alert severity={severity} variant="filled" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Box>
  )
}

Notification.propTypes = {
  notification: PropTypes.shape({
    message: PropTypes.string,
    type: PropTypes.string,
  }),
}

export default Notification
