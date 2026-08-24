import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useNotify } from '../hooks/useNotification'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const notify = useNotify()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      notify(`anecdote '${newAnecdote.content}' created`)
    },
    onError: (error) => {
      notify(error.message)
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const input = event.target.anecdote
    const content = input.value
    newAnecdoteMutation.mutate(
      { content, votes: 0 },
      {
        onSuccess: () => {
          input.value = ''
        },
      }
    )
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm