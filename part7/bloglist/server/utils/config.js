require('dotenv').config()
const dns = require('dns')

// Set DNS servers to resolve MongoDB SRV records reliably on Windows/all networks
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1'])
} catch {
  // Ignore in environments where setting servers is restricted
}

const PORT = process.env.PORT || 3003
const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI
const SECRET = process.env.SECRET

module.exports = {
  MONGODB_URI,
  PORT,
  SECRET
}
