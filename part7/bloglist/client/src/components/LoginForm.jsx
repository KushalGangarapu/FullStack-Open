import PropTypes from 'prop-types'
import { Card, CardContent, Typography, TextField, Button, Box } from '@mui/material'
import useField from '../hooks/useField'

const LoginForm = ({ handleLogin }) => {
  const usernameField = useField('text')
  const passwordField = useField('password')

  const { reset: resetUsername, ...usernameInput } = usernameField
  const { reset: resetPassword, ...passwordInput } = passwordField

  const onSubmit = (event) => {
    event.preventDefault()
    handleLogin({ username: usernameInput.value, password: passwordInput.value })
    resetUsername()
    resetPassword()
  }

  return (
    <Box sx={{ maxWidth: 450, mx: 'auto', mt: 4 }}>
      <Card elevation={4} sx={{ p: 2 }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom align="center">
            Log in to application
          </Typography>
          <form onSubmit={onSubmit}>
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Username"
                id="username"
                type={usernameInput.type}
                value={usernameInput.value}
                onChange={usernameInput.onChange}
                slotProps={{ htmlInput: { 'data-testid': 'username' } }}
                autoComplete="username"
              />
            </Box>
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                label="Password"
                id="password"
                type={passwordInput.type}
                value={passwordInput.value}
                onChange={passwordInput.onChange}
                slotProps={{ htmlInput: { 'data-testid': 'password' } }}
                autoComplete="current-password"
              />
            </Box>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              id="login-button"
              data-testid="login-button"
              size="large"
            >
              login
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
}

export default LoginForm
