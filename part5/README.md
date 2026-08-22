# Full Stack Open - Part 5: Testing React apps

This directory contains the solutions for Part 5 of the Full Stack Open course (Exercises 5.1 - 5.31).

## Exercises Summary

### Login in frontend (5.1 - 5.4)
Located in [`bloglist-frontend`](bloglist-frontend)
- **5.1: Blog List Frontend, step 1** - Implemented login functionality in frontend, saving auth token to application state and conditionally rendering login form when not authenticated.
- **5.2: Blog List Frontend, step 2** - Made login permanent by storing user details in `window.localStorage` (`loggedBlogappUser`) and implemented logout functionality.
- **5.3: Blog List Frontend, step 3** - Enabled logged-in users to add new blogs (title, author, url) with authenticated HTTP POST requests.
- **5.4: Blog List Frontend, step 4** - Implemented notification messages for successful and unsuccessful operations at the top of the page with auto-dismiss.

### props.children and component refs (5.5 - 5.12)
Located in [`bloglist-frontend`](bloglist-frontend)
- **5.5: Blog List Frontend, step 5** - Implemented togglable visibility for the new blog form using a reusable `Togglable` component.
- **5.6: Blog List Frontend, step 6** - Extracted blog creation form and its internal input state into a dedicated `BlogForm` component.
- **5.7: Blog List Frontend, step 7** - Added a toggle button ("view" / "hide") to each blog item to control the display of detailed information.
- **5.8: Blog List Frontend, step 8** - Implemented "like" button functionality making HTTP PUT requests to update likes in the backend.
- **5.9: Blog List Frontend, step 9** - Fixed user name display after liking so that user details remain visible without reloading the browser.
- **5.10: Blog List Frontend, step 10** - Sorted the blog posts in descending order by the number of likes.
- **5.11: Blog List Frontend, step 11** - Added a delete button with `window.confirm` confirmation dialog, displayed only for blogs created by the logged-in user.
- **5.12: Blog List Frontend, step 12** - Configured ESLint (`eslint.config.js`) and resolved all linter errors across the project.

### Testing React apps (5.13 - 5.16)
Located in [`bloglist-frontend`](bloglist-frontend)
- **5.13: Blog List Tests, step 1** - Component test verifying the blog component renders title and author, but does not render URL or likes by default.
- **5.14: Blog List Tests, step 2** - Component test verifying blog URL and number of likes are displayed when the "view" details button is clicked.
- **5.15: Blog List Tests, step 3** - Component test verifying that clicking the like button twice calls the event handler twice.
- **5.16: Blog List Tests, step 4** - Component test verifying that `BlogForm` calls the submit event handler with the correct details when creating a blog.

### End to end testing (5.17 - 5.23)
Located in [`bloglist-e2e`](bloglist-e2e)
- **5.17: Blog List End To End Testing, step 1** - Initialized npm project for Playwright tests and added a test verifying the login form is shown by default.
- **5.18: Blog List End To End Testing, step 2** - Implemented tests for successful and failed login, clearing the database and creating test users in `beforeEach`.
- **5.19: Blog List End To End Testing, step 3** - Implemented test verifying a logged-in user can create a new blog.
- **5.20: Blog List End To End Testing, step 4** - Implemented test verifying a blog can be liked and likes count increments.
- **5.21: Blog List End To End Testing, step 5** - Implemented test verifying the user who added a blog can delete it, handling the confirmation dialog.
- **5.22: Blog List End To End Testing, step 6** - Implemented test verifying that only the user who added the blog sees the delete button.
- **5.23: Blog List End To End Testing, step 7** - Implemented test verifying that blogs are ordered by number of likes (most likes first).

### React Router & UI frameworks (5.24 - 5.31)
Located in [`bloglist-frontend`](bloglist-frontend)
- **5.24: routed blogs, step 1** - Added React Router with navigation bar (`/` for all blogs, `/login` for login, and logout in navigation bar).
- **5.25: routed blogs, step 2** - Implemented single blog post view route (`/blogs/:id`) displaying blog details and like button for logged-in users.
- **5.26: routed blogs, step 3** - Created view for adding a new blog (`/create`) accessible via navigation, redirecting to all blogs on add and delete.
- **5.27: routed blogs, step 4** - Updated Vitest component tests for single blog view permissions (unauthenticated users, authenticated non-creators, and creators).
- **5.28: routed blogs, step 5** - Updated Playwright E2E tests for the routed blog application.
- **5.29: styled blogs, step 1** - Styled application forms (login form and create blog form) using Material-UI components.
- **5.30: styled blogs, step 2** - Styled navigation bar and notification alerts using Material-UI.
- **5.31: styled blogs, step 3** - Styled single blog view and blog list cards using Material-UI.
