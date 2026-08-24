import { useAnecdoteActions } from '../store'
import { useNotificationActions } from '../notificationStore'

const AnecdoteForm = () => {
  const { createAnecdote } = useAnecdoteActions()
  const { setNotification } = useNotificationActions()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    if (!content || !content.trim()) return
    await createAnecdote(content)
    setNotification(`you created '${content}'`, 5)
    event.target.reset()
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
