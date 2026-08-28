import { render, screen } from '@testing-library/react'
import Comments from './Comments'

describe('<Comments />', () => {
  test('renders list of comments', () => {
    const comments = ['First comment', 'Second comment', 'Awesome post!']
    render(<Comments blogId="123" comments={comments} />)

    expect(screen.getByText('Comments')).toBeDefined()
    expect(screen.getByText('First comment')).toBeDefined()
    expect(screen.getByText('Second comment')).toBeDefined()
    expect(screen.getByText('Awesome post!')).toBeDefined()
  })

  test('renders message when there are no comments', () => {
    render(<Comments blogId="123" comments={[]} />)

    expect(
      screen.getByText('No comments yet. Be the first to comment!')
    ).toBeDefined()
  })

  test('renders add comment input and button', () => {
    render(<Comments blogId="123" comments={[]} />)

    expect(screen.getByPlaceholderText('write a comment...')).toBeDefined()
    expect(screen.getByText('add comment')).toBeDefined()
  })
})
