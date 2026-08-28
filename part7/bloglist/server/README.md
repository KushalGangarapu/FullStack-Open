# Full Stack Open - Part 4: Testing Express servers, user administration

This directory contains the solutions for Part 4 of the Full Stack Open course (Exercises 4.1 - 4.23).

## Exercises Summary

### Structure of backend application, introduction to testing (4.1 - 4.7)
- **4.1: Blog List, step 1** - Initialized npm project and implemented initial Express app connecting to MongoDB.
- **4.2: Blog List, step 2** - Refactored application into modular architecture (`index.js`, `app.js`, `controllers/`, `models/`, `utils/`).
- **4.3: Helper Functions and Unit Tests, step 1** - Implemented `dummy` helper function and set up test environment using `node:test` and `node:assert`.
- **4.4: Helper Functions and Unit Tests, step 2** - Implemented `totalLikes` function to calculate the total sum of likes across blogs with tests.
- **4.5*: Helper Functions and Unit Tests, step 3** - Implemented `favoriteBlog` function returning the blog post with the most likes.
- **4.6*: Helper Functions and Unit Tests, step 4** - Implemented `mostBlogs` function using Lodash to find the author with the largest number of blogs.
- **4.7*: Helper Functions and Unit Tests, step 5** - Implemented `mostLikes` function using Lodash to find the author with the largest total amount of likes.

### Testing the backend (4.8 - 4.14)
- **4.8: Blog List Tests, step 1** - Implemented SuperTest integration test for `GET /api/blogs` and refactored route handler to `async/await`.
- **4.9: Blog List Tests, step 2** - Verified that the unique identifier property of blog posts is named `id` instead of `_id`.
- **4.10: Blog List Tests, step 3** - Implemented tests for `POST /api/blogs` verifying blog creation and refactored handler to `async/await`.
- **4.11*: Blog List Tests, step 4** - Implemented test and functionality ensuring `likes` property defaults to `0` if omitted.
- **4.12*: Blog List Tests, step 5** - Implemented tests and validation ensuring backend responds with status `400 Bad Request` if `title` or `url` is missing.
- **4.13: Blog List Expansions, step 1** - Implemented `DELETE /api/blogs/:id` using `async/await` returning `204 No Content` and added integration tests.
- **4.14: Blog List Expansions, step 2** - Implemented `PUT /api/blogs/:id` using `async/await` for updating blog likes and added integration tests.

### User administration & Token authentication (4.15 - 4.23)
- **4.15: Blog List Expansion, step 3** - Implemented user administration (`models/user.js`, `controllers/users.js`) with `bcryptjs` password hashing and `GET /api/users`.
- **4.16*: Blog List Expansion, step 4** - Added controller validation requiring username and password length $\ge 3$ and username uniqueness with status 400 responses and integration tests in `user_api.test.js`.
- **4.17: Blog List Expansion, step 5** - Linked blogs and users with Mongoose `populate` on `GET /api/blogs` and `GET /api/users`.
- **4.18: Blog List Expansion, step 6** - Implemented token-based authentication (`controllers/login.js`) using `jsonwebtoken`.
- **4.19: Blog List Expansion, step 7** - Required a valid token to add new blogs, setting the authenticated user as the blog creator.
- **4.20*: Blog List Expansion, step 8** - Extracted token parsing logic into dedicated `tokenExtractor` middleware in `utils/middleware.js`.
- **4.21*: Blog List Expansion, step 9** - Restricted blog deletion to the creator of the blog, returning `403 Forbidden` / `401 Unauthorized` for unauthorized users.
- **4.22*: Blog List Expansion, step 10** - Created `userExtractor` middleware to attach authenticated user to request, applied to `POST` and `DELETE` routes on `/api/blogs`.
- **4.23*: Blog List Expansion, step 11** - Refactored blog test suite to include token authorization and added a test ensuring blog creation fails with `401 Unauthorized` without a token.
