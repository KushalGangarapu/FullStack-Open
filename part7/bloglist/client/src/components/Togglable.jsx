import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button, Box } from '@mui/material'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <Box sx={{ my: 2 }}>
      <div style={hideWhenVisible}>
        <Button
          variant="contained"
          color="primary"
          onClick={toggleVisibility}
          data-testid="toggle-button"
        >
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        {props.children}
        <Box sx={{ mt: 1 }}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={toggleVisibility}
            data-testid="cancel-button"
          >
            cancel
          </Button>
        </Box>
      </div>
    </Box>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.node
}

export default Togglable
