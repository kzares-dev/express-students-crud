# Nodejs students-demo server

## 🔥 Tech Stach

- [x] express
- [x] mongodb
- [x] mongoose

## Project Structure

Inside of this, you'll see the following folders and files:

````bash
/

├── server.js
├── src/
│   ├── controllers/
│   │   └── students.controllers.js
│   ├── lib/
│   │   └── connect.method.js
│   ├── models/
│   │   └── student.model.js
│   └── routes/
│   │   └── student.route.js
└── package.json

## 👨🏻‍💻 Running Locally

You can start using this project locally
by running the following command in your desired directory:

```bash
git clone https://github.com/kzares-dev/express-students-crud.git/ ./
npm install
npm start
````

| File                      | Description                                                                                                        |
| :------------------------ | :----------------------------------------------------------------------------------------------------------------- |
| `server.js`               | Is the main entry point of the application, initialize the server/database & his config                            |
| `connect.method.js`       | Connects to mongodb remote server, in this app i select mongodb atlas, you must place your server url in .env file |
| `student.route.js`        | Matches routes with prefix /api/students                                                                           |
| `students.controllers.js` | Login for the interactivity with database                                                                          |
| `student.model.js`        | Defining models to insert in database                                                                              |

## Student API Endpoints

This API provides CRUD (Create, Read, Update, Delete) operations for managing students.

Student Model Example:
`{
  "firstName": "First Name",
  "lastName": "Last Name",
  "email": "email@example.com",
  "age": 12,
  grade: 2,
}`

### Endpoints:

| Endpoint            | Params | Body (JSON)                                                                                                | Response (JSON)                                                                                                                                             |
| :------------------ | :----- | :--------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/api/students`     |        |                                                                                                            | 200 OK: List of students (paginated and with search filters) - { students: [], nextPage: null, previousPage: null, total: 0, currentPage: 1, pageSize: 10 } |
| `/api/students`     |        | `{ "student": { "firstName": "First Name", "lastName": "Last Name", "email": "email@example.com", ... } }` | 201 Created: New student created - { message: 'Student created', student: { ... } }                                                                         |
| `/api/students/:id` | `id`   | `{ "student": { "firstName": "NewFirstName", "lastName": "NewLastName", ... } }`                           | 200 OK: Student updated - { message: 'Student updated', student: { ... } }                                                                                  |
| `/api/students/:id` | `id`   |                                                                                                            | 200 OK: Student deleted - { message: 'Student deleted' }                                                                                                    |

#### Details:

GET /api/students:

- Params:
  - `page`: Page number (optional, defaults to 1)
  - `limit`: Number of students per page (optional, defaults to 10)
  - `search`: Search term (optional, searches for `firstName`, `lastName`, and `email`)
- Response:
  - students: Array of student objects.
  - nextPage: Next page number if there are more students.
  - previousPage: Previous page number if there are more students.
  - total: Total number of students found.
  - currentPage: Current page number.
  - pageSize: Number of students per page.

POST /api/students:

- Body: Object with student information.
- Response:
  - message: Confirmation message.
  - student: Created student object.

PUT /api/students/:id:

- Params: `id`: ID of the student to update.
- Body: Object with updated student information.
- Response:
  - message: Confirmation message.
  - student: Updated student object.

DELETE /api/students/:id:

- Params: `id`: ID of the student to delete.
- Response:
  - message: Confirmation message.
