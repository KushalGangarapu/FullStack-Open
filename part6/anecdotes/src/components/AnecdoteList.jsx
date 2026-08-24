import { useAnecdotes, useAnecdoteActions } from '../store'
import { useNotificationActions } from '../notificationStore'

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
  const { voteAnecdote, deleteAnecdote } = useAnecdoteActions()
  const { setNotification } = useNotificationActions()

  const handleVote = async (anecdote) => {
    await voteAnecdote(anecdote.id)
    setNotification(`you voted '${anecdote.content}'`, 5)
  }

  const handleDelete = async (anecdote) => {
    await deleteAnecdote(anecdote.id)
    setNotification(`you deleted '${anecdote.content}'`, 5)
  }

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}{' '}
            <button onClick={() => handleVote(anecdote)}>vote</button>
            {anecdote.votes === 0 && (
              <button onClick={() => handleDelete(anecdote)}>delete</button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
