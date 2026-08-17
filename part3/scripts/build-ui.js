const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const frontendDir = path.resolve(__dirname, '../../part2/phonebook')
const backendDistDir = path.resolve(__dirname, '../dist')

console.log('Building frontend in:', frontendDir)
execSync('npm run build', { cwd: frontendDir, stdio: 'inherit' })

const frontendDistDir = path.join(frontendDir, 'dist')

console.log('Copying build from:', frontendDistDir, 'to:', backendDistDir)

if (fs.existsSync(backendDistDir)) {
  fs.rmSync(backendDistDir, { recursive: true, force: true })
}

fs.cpSync(frontendDistDir, backendDistDir, { recursive: true })
console.log('Frontend build successfully deployed to backend dist!')
