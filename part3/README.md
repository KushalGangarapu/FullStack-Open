# Full Stack Open - Part 3: Programming a server with NodeJS and Express

This directory contains the solutions for Part 3 of the Full Stack Open course (Exercises 3.1 - 3.22).

## Exercises Summary

### Phonebook backend (3.1 - 3.8)
- **3.1: Phonebook backend, step 1** - Implemented a Node/Express backend that returns a hardcoded list of phonebook entries from `/api/persons`.
- **3.2: Phonebook backend, step 2** - Implemented `/info` page showing the count of entries and request timestamp.
- **3.3: Phonebook backend, step 3** - Implemented fetching a single phonebook entry by id (`/api/persons/:id`) with 404 response on missing entry.
- **3.4: Phonebook backend, step 4** - Implemented deleting a single phonebook entry (`DELETE /api/persons/:id`).
- **3.5: Phonebook backend, step 5** - Implemented creating new phonebook entries via `POST /api/persons`.
- **3.6: Phonebook backend, step 6** - Added error handling for missing name/number or duplicate names on entry creation.
- **3.7: Phonebook backend, step 7** - Configured `morgan` logging middleware with `tiny` format.
- **3.8*: Phonebook backend, step 8** - Configured `morgan` with a custom token to log HTTP POST request body data.

### Deploying app to internet (3.9 - 3.11)
- **3.9: Phonebook backend, step 9** - Configured CORS and frontend Vite proxy to connect React frontend to backend.
- **3.10: Phonebook backend, step 10** - Deployed backend to hosting platform (Render/Fly.io) and prepared production documentation.
- **3.11: Full Stack Phonebook** - Built frontend production bundle (`dist`) and configured backend to serve static files with `express.static('dist')`.

### Command-line database (3.12)
- **3.12: Command-line database** - Created [`mongo.js`](mongo.js) script to list all phonebook entries or add new entries from command line arguments using Mongoose.

### Saving data to MongoDB (3.13 - 3.18)
- **3.13: Phonebook database, step 1** - Extracted Mongoose database configuration into dedicated [`models/person.js`](models/person.js) module and fetched entries from MongoDB.
- **3.14: Phonebook database, step 2** - Updated entry creation to persist new contacts into MongoDB Atlas.
- **3.15: Phonebook database, step 3** - Implemented deleting contacts from MongoDB using `findByIdAndDelete`.
- **3.16: Phonebook database, step 4** - Created centralized error handler middleware (`errorHandler`) and `unknownEndpoint` handler.
- **3.17*: Phonebook database, step 5** - Implemented `PUT /api/persons/:id` to update contact phone numbers with validation.
- **3.18*: Phonebook database, step 6** - Updated `GET /api/persons/:id` and `/info` endpoints to fetch live data from MongoDB.

### Validation and ESLint (3.19 - 3.22)
- **3.19*: Phonebook database, step 7** - Added Mongoose schema validation requiring `name` length of at least 3 characters and displayed error messages on frontend.
- **3.20*: Phonebook database, step 8** - Added custom phone number validation requiring length >= 8 and 2 or 3 digits before hyphen (`^\d{2,3}-\d+$`).
- **3.21: Deploying database backend to production** - Created production build with database integration and full-stack static distribution.
- **3.22: Lint configuration** - Configured ESLint flat config ([`eslint.config.mjs`](eslint.config.mjs)) with `@eslint/js` and `@stylistic/eslint-plugin`, fixing all lint warnings and errors.
