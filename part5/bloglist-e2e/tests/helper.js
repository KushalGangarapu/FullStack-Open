const loginWith = async (page, username, password) => {
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByTestId('login-button').click()
}

const createBlog = async (page, title, author, url) => {
  const toggleBtn = page.getByRole('button', { name: 'create new blog' })
  await toggleBtn.click()

  await page.getByTestId('title-input').fill(title)
  await page.getByTestId('author-input').fill(author)
  await page.getByTestId('url-input').fill(url)
  await page.getByTestId('create-blog-button').click()

  // Wait for the created blog to appear in the DOM
  await page.getByText(`${title} ${author}`).waitFor()
}

module.exports = { loginWith, createBlog }
