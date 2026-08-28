import { useAnecdotes } from '../hooks'

const AnecdoteList = () => {
  const { anecdotes, deleteAnecdote } = useAnecdotes()

  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map((anecdote) => (
          <li key={anecdote.id}>
            <span>{anecdote.content}</span>{' '}
            <button type="button" onClick={() => deleteAnecdote(anecdote.id)}>
              delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AnecdoteList
