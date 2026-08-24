import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, updateAnecdote } from '../requests'

export const useAnecdotes = () => {
  const queryClient = useQueryClient()

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1,
    refetchOnWindowFocus: false,
  })

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  const voteAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  return {
    anecdotes: result.data,
    isPending: result.isPending,
    isError: result.isError,
    error: result.error,
    newAnecdoteMutation,
    voteAnecdoteMutation,
    createAnecdote: (newAnecdote, options) =>
      newAnecdoteMutation.mutate(newAnecdote, options),
    voteAnecdote: (anecdote, options) =>
      voteAnecdoteMutation.mutate(
        { ...anecdote, votes: anecdote.votes + 1 },
        options
      ),
  }
}

export default useAnecdotes
