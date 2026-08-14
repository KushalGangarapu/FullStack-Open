# Full Stack Open - Part 2: Communicating with server

This directory contains the solutions for Part 2 of the Full Stack Open course (Exercises 2.1 - 2.20).

## Exercises Summary

### Course Information (2.1 - 2.5)
Located in [`courseinfo`](courseinfo)
- **2.1: Course information, step 6** - Refactored `Course` component structure to dynamically render any number of parts without hardcoding.
- **2.2: Course information, step 7** - Calculated and displayed the total sum of exercises for each course.
- **2.3*: Course information, step 8** - Implemented total exercise calculation using `Array.prototype.reduce`.
- **2.4: Course information, step 9** - Extended the application to handle and render an arbitrary collection/array of courses.
- **2.5: Separate module, step 10** - Extracted the `Course` component into its own standalone module (`src/components/Course.jsx`).

### The Phonebook (2.6 - 2.17)
Located in [`phonebook`](phonebook)
- **2.6: The Phonebook, step 1** - Controlled form to add new contacts by name to the phonebook list.
- **2.7: The Phonebook, step 2** - Prevented duplicate entries by displaying a browser alert when an existing name is entered.
- **2.8: The Phonebook, step 3** - Added support for phone numbers via a controlled number input field.
- **2.9*: The Phonebook, step 4** - Added case-insensitive search filter functionality.
- **2.10: The Phonebook, step 5** - Refactored application into modular components (`Filter`, `PersonForm`, `Persons`, and `Person`).
- **2.11: The Phonebook, step 6** - Initialized state from `db.json` via `json-server` and `axios` inside a `useEffect` hook.
- **2.12: The Phonebook, step 7** - Persisted new contact creations to backend server with HTTP POST.
- **2.13: The Phonebook, step 8** - Abstracted backend API calls into a dedicated service module (`src/services/persons.js`).
- **2.14: The Phonebook, step 9** - Added delete functionality with user confirmation dialog (`window.confirm`) and HTTP DELETE.
- **2.15*: The Phonebook, step 10** - Allowed updating an existing contact's phone number with confirmation and HTTP PUT.
- **2.16: Phonebook, step 11** - Added a stylish green notification banner that displays operation feedback and auto-dismisses after 5 seconds.
- **2.17*: Phonebook, step 12** - Handled error cases (such as updating or deleting entries that no longer exist on the server) with distinct red error notifications and state synchronization.

### Data for Countries (2.18 - 2.20)
Located in [`countries`](countries)
- **2.18*: Data for countries, step 1** - Search interface querying REST Countries API (`https://studies.cs.helsinki.fi/restcountries/api/all`), handling >10 matches prompt, 2-10 matches listing, and single country detailed view (name, capital, area, languages, and flag).
- **2.19*: Data for countries, step 2** - Added a "show" button beside each country in multi-match lists to immediately open that country's detail view.
- **2.20*: Data for countries, step 3** - Integrated OpenWeatherMap API with API key loaded via `import.meta.env.VITE_SOME_KEY` to render the capital city's current temperature, weather icon, and wind speed.
