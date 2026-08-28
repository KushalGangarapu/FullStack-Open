import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import NotFound from './NotFound'

describe('<NotFound />', () => {
  test('renders 404 page not found message', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    )

    expect(screen.getByText('404 - Page not found')).toBeDefined()
    expect(screen.getByText('The page you are looking for does not exist.')).toBeDefined()
    expect(screen.getByText('Go to Blogs')).toBeDefined()
  })
})
