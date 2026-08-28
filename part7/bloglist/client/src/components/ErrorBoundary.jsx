import React from 'react'
import PropTypes from 'prop-types'
import { Container, Typography, Button, Paper } from '@mui/material'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught an error', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container sx={{ mt: 4 }}>
          <Paper sx={{ p: 4, textAlign: 'center', backgroundColor: '#fff3f3' }}>
            <Typography variant="h5" color="error" gutterBottom>
              Something went wrong.
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              {this.state.error?.message || 'An unexpected error occurred.'}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.setState({ hasError: false, error: null })}
            >
              try again
            </Button>
          </Paper>
        </Container>
      )
    }
    return this.props.children
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node,
}

export default ErrorBoundary
