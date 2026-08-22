const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    // Empty the database
    await request.post('http://localhost:3003/api/testing/reset')

    // Create a user for the backend
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })

    // Create a second user for testing permissions
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Arto Hellas',
        username: 'hellas',
        password: 'salainen'
      }
    })

    await page.goto('/')
  })

  // Exercise 5.17: Login form is shown by default
  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('Log in to application')).toBeVisible()
    await expect(page.getByTestId('username')).toBeVisible()
    await expect(page.getByTestId('password')).toBeVisible()
    await expect(page.getByTestId('login-button')).toBeVisible()
  })

  // Exercise 5.18: Login tests
  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
      await expect(page.getByTestId('logout-button')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'wrongpassword')
      const notification = page.getByTestId('notification')
      await expect(notification).toBeVisible()
      await expect(notification).toContainText('wrong username or password')
      await expect(page.getByText('Matti Luukkainen logged in')).not.toBeVisible()
    })
  })

  // Exercises 5.19 - 5.23 & 5.28: When logged in
  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
      await expect(page.getByTestId('logout-button')).toBeVisible()
    })

    // Exercise 5.19 & 5.28: a new blog can be created
    test('a new blog can be created', async ({ page }) => {
      await createBlog(
        page,
        'Full Stack Open End to End Testing',
        'Matti Luukkainen',
        'https://fullstackopen.com'
      )

      await expect(page.getByText('Full Stack Open End to End Testing Matti Luukkainen')).toBeVisible()
    })

    // Exercise 5.20 & 5.28: a blog can be liked
    test('a blog can be liked', async ({ page }) => {
      await createBlog(
        page,
        'Liking Playwright Test Blog',
        'Kent C. Dodds',
        'https://kentcdodds.com'
      )

      const blogElement = page.locator('.blog').filter({ hasText: 'Liking Playwright Test Blog' })
      const viewButton = blogElement.getByTestId('view-button')
      await viewButton.click()

      await expect(blogElement.getByTestId('blog-likes')).toContainText('likes 0')

      const likeButton = blogElement.getByTestId('like-button')
      await likeButton.click()

      await expect(blogElement.getByTestId('blog-likes')).toContainText('likes 1')
    })

    // Exercise 5.21 & 5.28: the user who added the blog can delete it
    test('user who added the blog can delete it', async ({ page }) => {
      await createBlog(
        page,
        'Blog to be deleted',
        'Delete Author',
        'https://delete.me'
      )

      const blogElement = page.locator('.blog').filter({ hasText: 'Blog to be deleted' })
      const viewButton = blogElement.getByTestId('view-button')
      await viewButton.click()

      page.on('dialog', async (dialog) => {
        await dialog.accept()
      })

      const deleteButton = blogElement.getByTestId('delete-button')
      await deleteButton.click()

      await expect(page.getByText('Blog to be deleted Delete Author')).not.toBeVisible()
    })

    // Exercise 5.22: only the user who added the blog sees the delete button
    test('only the user who added the blog sees the delete button', async ({ page }) => {
      await createBlog(
        page,
        'Creator Exclusive Blog',
        'Matti Luukkainen',
        'https://exclusive.com'
      )

      const blogElement = page.locator('.blog').filter({ hasText: 'Creator Exclusive Blog' })
      const viewButton = blogElement.getByTestId('view-button')
      await viewButton.click()

      // Creator sees the delete button
      await expect(blogElement.getByTestId('delete-button')).toBeVisible()

      // Log out
      await page.getByTestId('logout-button').click()

      // Log in as second user
      await loginWith(page, 'hellas', 'salainen')
      await expect(page.getByText('Arto Hellas logged in')).toBeVisible()

      // Expand the blog
      const otherBlogElement = page.locator('.blog').filter({ hasText: 'Creator Exclusive Blog' })
      await otherBlogElement.getByTestId('view-button').click()

      // Non-creator does NOT see the delete button
      await expect(otherBlogElement.getByTestId('delete-button')).not.toBeVisible()
    })

    // Exercise 5.23: blogs are arranged in order of likes (most likes first)
    test('blogs are arranged in the order according to likes, most likes first', async ({ page }) => {
      // Create first blog
      await createBlog(
        page,
        'First Blog with Few Likes',
        'Author One',
        'https://one.com'
      )

      // Create second blog
      await createBlog(
        page,
        'Second Blog with Many Likes',
        'Author Two',
        'https://two.com'
      )

      // Expand second blog and like it twice
      const secondBlogElement = page.locator('.blog').filter({ hasText: 'Second Blog with Many Likes' })
      await secondBlogElement.getByTestId('view-button').click()
      const secondLikeButton = secondBlogElement.getByTestId('like-button')
      await secondLikeButton.click()
      await expect(secondBlogElement.getByTestId('blog-likes')).toContainText('likes 1')
      await secondLikeButton.click()
      await expect(secondBlogElement.getByTestId('blog-likes')).toContainText('likes 2')

      // Expand first blog and like it once
      const firstBlogElement = page.locator('.blog').filter({ hasText: 'First Blog with Few Likes' })
      await firstBlogElement.getByTestId('view-button').click()
      const firstLikeButton = firstBlogElement.getByTestId('like-button')
      await firstLikeButton.click()
      await expect(firstBlogElement.getByTestId('blog-likes')).toContainText('likes 1')

      // Verify ordering: The blog with 2 likes must be before the blog with 1 like
      const blogElements = page.locator('.blog')
      await expect(blogElements.first()).toContainText('Second Blog with Many Likes')
      await expect(blogElements.nth(1)).toContainText('First Blog with Few Likes')
    })
  })
})
