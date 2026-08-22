import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  // Exercise 5.16: form calls event handler with right details when blog created
  test('calls event handler with right details when a new blog is created', async () => {
    const createBlog = vi.fn()
    const user = userEvent.setup()

    render(<BlogForm createBlog={createBlog} />)

    const titleInput = screen.getByPlaceholderText('title')
    const authorInput = screen.getByPlaceholderText('author')
    const urlInput = screen.getByPlaceholderText('url')
    const sendButton = screen.getByText('create')

    await user.type(titleInput, 'Canonical String Reduction')
    await user.type(authorInput, 'Edsger W. Dijkstra')
    await user.type(urlInput, 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html')
    await user.click(sendButton)

    expect(createBlog).toHaveBeenCalledTimes(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Canonical String Reduction')
    expect(createBlog.mock.calls[0][0].author).toBe('Edsger W. Dijkstra')
    expect(createBlog.mock.calls[0][0].url).toBe('http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html')
  })
})
