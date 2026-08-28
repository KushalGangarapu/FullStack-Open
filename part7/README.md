# Full Stack Open - Part 7: React router, custom hooks, styling app with CSS and webpack

This directory contains the solutions for Part 7 of the Full Stack Open course (Exercises 7.1 - 7.20).

## Exercises Summary

### React Hooks (7.1 - 7.6)
Located in [`routed-anecdotes`](routed-anecdotes)
- **7.1: useField hook** - Implemented custom `useField` hook managing form input state (`type`, `value`, `onChange`) and used in anecdote creation form.
- **7.2: useField with reset** - Added `reset` function to `useField` and a reset button to clear all input fields.
- **7.3: Fixing the spread issue** - Separated `reset` from input DOM attributes to avoid `Invalid value for prop reset on <input> tag` console warnings when using spread syntax.
- **7.4: useAnecdotes, step 1** - Implemented custom `useAnecdotes` hook encapsulating server communication with the JSON server backend.
- **7.5: useAnecdotes, step 2** - Extended `useAnecdotes` to support creating new anecdotes (`addAnecdote`) via HTTP POST and updating local state.
- **7.6: useAnecdotes, step 3** - Extended `useAnecdotes` with `deleteAnecdote` via HTTP DELETE, added delete buttons next to anecdotes, and refactored components to call `useAnecdotes` directly without props.

### Extending the BlogList (7.7 - 7.20)
Located in [`bloglist`](bloglist)
- **7.7: Frontend and backend in the same repository** - Restructured the application into a single repository containing frontend (`client`) and backend (`server`) with root scripts using `concurrently` for development and production static serving.
- **7.8: Error boundary** - Added `ErrorBoundary` class component catching rendering errors and displaying fallback UI while keeping navigation bar outside.
- **7.9: Nonexisting routes** - Added React Router splat route (`path="*"`) rendering a dedicated `NotFound` page (404 Page Not Found).
- **7.10: Automatic Code Formatting** - Configured Prettier (`.prettierrc`) for automatic and consistent code formatting across the codebase.
- **7.11: Zustand, Step 1** - Refactored notification data management into a Zustand store (`notificationStore.js`).
- **7.12: Zustand, Step 2** - Stored blog posts in a Zustand store (`blogStore.js`) supporting fetching and creation of new blogs.
- **7.13: Zustand, Step 3** - Expanded `blogStore.js` to handle liking and deleting blogs.
- **7.14: Zustand, Step 4** - Managed authenticated user data in a Zustand store (`userStore.js`).
- **7.15: Cleaning the code** - Extracted `localStorage` operations into `persistentUser.js` service and used `useField` hook across all form components.
- **7.16: Users view** - Implemented `/users` view displaying a table of all users with their blog counts and links to user pages.
- **7.17: Individual User View** - Implemented `/users/:id` view displaying an individual user's name and list of added blogs.
- **7.18: Comments, step 1** - Added backend `POST /api/blogs/:id/comments` endpoint and updated single blog view to display anonymous comments.
- **7.19: Comments, step 2** - Added commenting form on frontend to submit anonymous comments and update state immediately.
- **7.20: Styling** - Enhanced application appearance with polished Material-UI styling for navigation, cards, tables, alerts, and forms.
