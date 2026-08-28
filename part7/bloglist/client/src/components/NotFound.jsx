import { Container, Typography, Paper, Button } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

const NotFound = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom color="text.secondary">
          404 - Page not found
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          The page you are looking for does not exist.
        </Typography>
        <Button variant="contained" component={RouterLink} to="/">
          Go to Blogs
        </Button>
      </Paper>
    </Container>
  )
}

export default NotFound
