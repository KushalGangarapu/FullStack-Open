import { useState, useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Link,
  Box,
} from '@mui/material'
import userService from '../services/users'

const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getAll().then((data) => setUsers(data))
  }, [])

  return (
    <Box sx={{ my: 3 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Users
      </Typography>
      <TableContainer component={Paper} sx={{ maxWidth: 600, mt: 2 }}>
        <Table aria-label="users table">
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>User</strong>
              </TableCell>
              <TableCell align="right">
                <strong>blogs created</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} hover>
                <TableCell component="th" scope="row">
                  <Link component={RouterLink} to={`/users/${user.id}`} underline="hover">
                    {user.name || user.username}
                  </Link>
                </TableCell>
                <TableCell align="right">
                  {user.blogs ? user.blogs.length : 0}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default Users
