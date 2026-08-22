import { useState } from 'react'
import PropTypes from 'prop-types'
import { Card, CardContent, Typography, TextField, Button, Box } from '@mui/material'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = (event) => {
    event.preventDefault()
    handleLogin({ username, password })
    setUsername('')
    setPassword('')
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
                slotProps={{ htmlInput: { 'data-testid': 'username' } }}
                value={username}
                onChange={({ target }) => setUsername(target.value)}
                autoComplete="username"
              />
            </Box>
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                id="password"
                slotProps={{ htmlInput: { 'data-testid': 'password' } }}
                value={password}
                onChange={({ target }) => setPassword(target.value)}
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
  handleLogin: PropTypes.func.isRequired
}

export default LoginForm
