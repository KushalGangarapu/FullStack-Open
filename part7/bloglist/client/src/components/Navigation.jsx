import PropTypes from 'prop-types'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import PeopleIcon from '@mui/icons-material/People'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import LogoutIcon from '@mui/icons-material/Logout'
import LoginIcon from '@mui/icons-material/Login'
import { useUserStore } from '../stores/userStore'

const Navigation = ({ user: propUser, handleLogout: propHandleLogout }) => {
  const storeUser = useUserStore((state) => state.user)
  const storeLogout = useUserStore((state) => state.logout)
  const user = propUser !== undefined ? propUser : storeUser
  const handleLogout = propHandleLogout || storeLogout
  const navigate = useNavigate()

  const onLogout = () => {
    handleLogout()
    navigate('/')
  }

  return (
    <AppBar position="static" color="primary" elevation={3}>
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <MenuBookIcon /> Blog App
            </Typography>
            <Button color="inherit" component={RouterLink} to="/" data-testid="nav-blogs">
              blogs
            </Button>
            <Button
              color="inherit"
              component={RouterLink}
              to="/users"
              startIcon={<PeopleIcon />}
              data-testid="nav-users"
            >
              users
            </Button>
            {user && (
              <Button
                color="inherit"
                component={RouterLink}
                to="/create"
                startIcon={<AddCircleOutlineIcon />}
                data-testid="nav-create"
              >
                create new
              </Button>
            )}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {user ? (
              <>
                <Typography
                  variant="body2"
                  sx={{ fontStyle: 'italic' }}
                  data-testid="logged-in-user-text"
                >
                  <em>{user.name || user.username} logged in</em>
                </Typography>
                <Button
                  color="inherit"
                  variant="outlined"
                  size="small"
                  startIcon={<LogoutIcon />}
                  onClick={onLogout}
                  id="logout-button"
                  data-testid="logout-button"
                  sx={{ borderColor: 'rgba(255, 255, 255, 0.5)' }}
                >
                  logout
                </Button>
              </>
            ) : (
              <Button
                color="inherit"
                variant="outlined"
                component={RouterLink}
                to="/login"
                startIcon={<LoginIcon />}
                data-testid="nav-login"
                sx={{ borderColor: 'rgba(255, 255, 255, 0.5)' }}
              >
                login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

Navigation.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    username: PropTypes.string,
    name: PropTypes.string,
  }),
  handleLogout: PropTypes.func,
}

export default Navigation
