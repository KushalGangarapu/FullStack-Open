# Full Stack Open - Part 6: Advanced State Management

This directory contains the solutions for Part 6 of the Full Stack Open course (Exercises 6.1 - 6.22).

## Exercises Summary

### Unicafe with Zustand (6.1)
Located in [`unicafe`](unicafe)
- **6.1: Unicafe revisited** - Re-implemented Unicafe feedback application using Zustand store for state management.

### Anecdotes with Zustand & Testing (6.2 - 6.15)
Located in [`anecdotes`](anecdotes)
- **6.2: Anecdotes, step 1** - Implemented voting functionality using Zustand store.
- **6.3: Anecdotes, step 2** - Added functionality for adding new anecdotes via an uncontrolled form.
- **6.4: Anecdotes, step 3** - Separated anecdote creation into `AnecdoteForm` and listing into `AnecdoteList`.
- **6.5: Anecdotes, step 4** - Ensured anecdotes are displayed in descending order by vote count using immutable sorting (`toSorted`).
- **6.6: Anecdotes, step 5** - Implemented search filter component with state maintained in the Zustand store.
- **6.7: Anecdotes, step 6** - Fetched initial anecdotes from JSON Server backend on application launch using Fetch API.
- **6.8: Anecdotes, step 7** - Persisted newly created anecdotes to JSON Server backend via HTTP POST.
- **6.9: Anecdotes, step 8** - Persisted anecdote votes to backend via HTTP PUT requests.
- **6.10: Anecdotes, step 9** - Created `Notification` component powered by a Zustand store with 5-second auto-clear timers.
- **6.11: Anecdotes, step 10** - Added feature to delete anecdotes that have zero votes using HTTP DELETE.
- **6.12: Anecdotes, step 11** - Added Vitest unit test verifying store initialization with backend data.
- **6.13: Anecdotes, step 12** - Added Vitest unit test verifying `useAnecdotes` returns anecdotes sorted by votes.
- **6.14: Anecdotes, step 13** - Added Vitest unit test verifying `useAnecdotes` returns properly filtered anecdotes.
- **6.15: Anecdotes, step 14** - Added Vitest unit test verifying voting increments vote count in store.

### React Query and Context API (6.16 - 6.22)
Located in [`query-anecdotes`](query-anecdotes)
- **6.16: TanStack Query setup** - Implemented server state management using `@tanstack/react-query` and displayed error page when backend is unreachable.
- **6.17: Anecdote creation** - Handled anecdote creation with TanStack Query mutations and cache invalidation.
- **6.18: Anecdote voting** - Handled anecdote voting using TanStack Query mutations.
- **6.19: Custom Hook** - Extracted TanStack Query queries and mutations into a custom `useAnecdotes` hook.
- **6.20: Context API notifications** - Managed notification state across the app using React Context API with 5-second dismiss timers.
- **6.21: Error notifications** - Handled short anecdote error (<5 characters) in mutation `onError` callback and displayed notification.
- **6.22: Notification Context extraction** - Isolated context in `NotificationContext.jsx` and created custom `useNotify` hook.
