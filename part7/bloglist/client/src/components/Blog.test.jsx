import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Blog from './Blog'

describe('<Blog />', () => {
  let blog
  let mockLikeHandler
  let mockDeleteHandler

  beforeEach(() => {
    blog = {
      id: '5a43fde2cbd20b12a2c34e91',
      title: 'Testing React components with Vitest',
      author: 'Martin Fowler',
      url: 'https://martinfowler.com/testing',
      likes: 42,
      user: {
        id: 'user123',
        username: 'mluukkai',
        name: 'Matti Luukkainen'
      }
    }
    mockLikeHandler = vi.fn()
    mockDeleteHandler = vi.fn()
  })

  // Exercise 5.13: renders title and author, does not render URL or likes by default
  test('renders title and author, but not url or likes by default', () => {
    const { container } = render(
      <MemoryRouter>
        <Blog blog={blog} />
      </MemoryRouter>
    )

    const element = screen.getByText('Testing React components with Vitest Martin Fowler')
    expect(element).toBeDefined()

    const details = container.querySelector('.blog-details')
    expect(details).toBeNull()

    expect(screen.queryByText('https://martinfowler.com/testing')).toBeNull()
    expect(screen.queryByText('likes 42')).toBeNull()
  })

  // Exercise 5.14: renders URL and likes when view button is clicked
  test('renders url and likes when view button is clicked', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <Blog blog={blog} handleLike={mockLikeHandler} />
      </MemoryRouter>
    )

    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    expect(screen.getByText('https://martinfowler.com/testing')).toBeDefined()
    expect(screen.getByText('likes 42')).toBeDefined()
    expect(screen.getByText('added by Matti Luukkainen')).toBeDefined()
  })

  // Exercise 5.15: like button clicked twice calls event handler twice
  test('clicking like button twice calls event handler twice', async () => {
    const currentUser = { id: 'user123', username: 'mluukkai' }
    const user = userEvent.setup()

    render(
      <MemoryRouter>
        <Blog
          blog={blog}
          handleLike={mockLikeHandler}
          user={currentUser}
        />
      </MemoryRouter>
    )

    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockLikeHandler).toHaveBeenCalledTimes(2)
  })

  // Exercise 5.27: Unauthenticated users see blog info and likes, but neither like nor delete button
  test('unauthenticated users see blog info and likes, but no action buttons', () => {
    render(
      <MemoryRouter>
        <Blog blog={blog} showDetailsAlways={true} user={null} />
      </MemoryRouter>
    )

    expect(screen.getByText('Testing React components with Vitest Martin Fowler')).toBeDefined()
    expect(screen.getByText('https://martinfowler.com/testing')).toBeDefined()
    expect(screen.getByText('likes 42')).toBeDefined()

    expect(screen.queryByTestId('like-button')).toBeNull()
    expect(screen.queryByTestId('delete-button')).toBeNull()
  })

  // Exercise 5.27: Authenticated non-creators see like button but not delete button
  test('authenticated non-creator sees like button but not delete button', () => {
    const otherUser = { id: 'other456', username: 'otheruser' }
    render(
      <MemoryRouter>
        <Blog blog={blog} showDetailsAlways={true} user={otherUser} />
      </MemoryRouter>
    )

    expect(screen.getByTestId('like-button')).toBeDefined()
    expect(screen.queryByTestId('delete-button')).toBeNull()
  })

  // Exercise 5.27: Blog creator sees both like button and delete button
  test('creator sees both like button and delete button', () => {
    const creatorUser = { id: 'user123', username: 'mluukkai' }
    render(
      <MemoryRouter>
        <Blog
          blog={blog}
          showDetailsAlways={true}
          user={creatorUser}
          handleDelete={mockDeleteHandler}
        />
      </MemoryRouter>
    )

    expect(screen.getByTestId('like-button')).toBeDefined()
    expect(screen.getByTestId('delete-button')).toBeDefined()
  })
})
