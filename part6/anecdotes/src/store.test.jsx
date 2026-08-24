import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'

vi.mock('./services/anecdotes', () => ({
  default: {
    getAll: vi.fn(),
    createNew: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  },
}))

import anecdoteService from './services/anecdotes'
import useAnecdoteStore, { useAnecdotes, useAnecdoteActions } from './store'

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], filter: '' })
  vi.clearAllMocks()
})

describe('Anecdotes store and hooks', () => {
  it('initializes state with anecdotes from backend', async () => {
    const mockAnecdotes = [
      { id: '1', content: 'First anecdote', votes: 2 },
      { id: '2', content: 'Second anecdote', votes: 5 },
    ]
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

    const { result: actionsResult } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await actionsResult.current.initialize()
    })

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    expect(anecdotesResult.current).toHaveLength(2)
    expect(anecdotesResult.current).toEqual([
      { id: '2', content: 'Second anecdote', votes: 5 },
      { id: '1', content: 'First anecdote', votes: 2 },
    ])
  })

  it('returns anecdotes sorted in descending order by votes', () => {
    const mockAnecdotes = [
      { id: '1', content: 'Low votes', votes: 1 },
      { id: '2', content: 'High votes', votes: 10 },
      { id: '3', content: 'Medium votes', votes: 5 },
    ]
    useAnecdoteStore.setState({ anecdotes: mockAnecdotes, filter: '' })

    const { result } = renderHook(() => useAnecdotes())

    expect(result.current.map((a) => a.votes)).toEqual([10, 5, 1])
    expect(result.current[0].content).toBe('High votes')
    expect(result.current[1].content).toBe('Medium votes')
    expect(result.current[2].content).toBe('Low votes')
  })

  it('returns a properly filtered list of anecdotes based on filter value', () => {
    const mockAnecdotes = [
      { id: '1', content: 'React is amazing', votes: 3 },
      { id: '2', content: 'Redux was popular', votes: 4 },
      { id: '3', content: 'Zustand is simple', votes: 8 },
    ]
    useAnecdoteStore.setState({ anecdotes: mockAnecdotes, filter: 're' })

    const { result } = renderHook(() => useAnecdotes())

    expect(result.current).toHaveLength(2)
    expect(result.current.map((a) => a.content)).toEqual([
      'Redux was popular',
      'React is amazing',
    ])
  })

  it('voting increases the vote count of the anecdote', async () => {
    const initial = { id: '1', content: 'Vote for me', votes: 0 }
    useAnecdoteStore.setState({ anecdotes: [initial], filter: '' })
    anecdoteService.update.mockResolvedValue({ ...initial, votes: 1 })

    const { result: actionsResult } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await actionsResult.current.voteAnecdote('1')
    })

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    expect(anecdotesResult.current[0].votes).toBe(1)
    expect(anecdoteService.update).toHaveBeenCalledWith('1', {
      ...initial,
      votes: 1,
    })
  })
})
