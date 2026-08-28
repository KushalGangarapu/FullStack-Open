import { render, screen } from '@testing-library/react'
import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest'
import ErrorBoundary from './ErrorBoundary'

const ProblemChild = () => {
  throw new Error('Test rendering crash')
}

const GoodChild = () => <div>All good</div>

describe('<ErrorBoundary />', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    console.error.mockRestore()
  })

  test('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <GoodChild />
      </ErrorBoundary>
    )

    expect(screen.getByText('All good')).toBeDefined()
  })

  test('catches error and displays fallback UI', () => {
    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    )

    expect(screen.getByText('Something went wrong.')).toBeDefined()
    expect(screen.getByText('Test rendering crash')).toBeDefined()
    expect(screen.getByText('try again')).toBeDefined()
  })
})
