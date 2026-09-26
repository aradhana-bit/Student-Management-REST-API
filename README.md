# Student Management REST API

## Assignment Description

This project is a beginner-friendly Express.js REST API for managing student records. It was created for the Web Dev III (Node.js & Express Backend) Lab Assignment 2. Student records are stored in an in-memory JavaScript array, so no database is required.

## Features

- Express.js server
- Complete student CRUD operations
- Custom request logger middleware
- Modular student routing
- Input validation and clear JSON errors
- Appropriate HTTP status codes
- Postman collection for testing

## Technologies Used

- Node.js
- Express.js
- JavaScript
- JSON and in-memory arrays
- Postman (for API testing)

## Project Structure

```text
Student_Management_REST_API/
├── app.js
├── routes/
│   └── studentRoutes.js
├── middleware/
│   └── logger.js
├── data/
│   └── students.js
├── package.json
├── package-lock.json
├── Student_Management_API.postman_collection.json
└── README.md
```

## Installation

1. Install Node.js if it is not already installed.
2. Open a terminal in the project folder.
3. Install dependencies:

```bash
npm install
```

## Run the Server

Start the server with:

```bash
npm start
```

The API runs at `http://localhost:3000`.

For development with automatic restart (after installing dependencies):

```bash
npm run dev
```

## API Endpoints

| Method | Endpoint | Description | Success status |
|---|---|---|---:|
| GET | `/students` | Return all students | 200 |
| GET | `/students/:id` | Return one student | 200 |
| POST | `/students` | Create a student | 201 |
| PUT | `/students/:id` | Update one or more student fields | 200 |
| DELETE | `/students/:id` | Delete a student | 200 |

The server also provides `GET /` as a simple health check.

### Example POST Request Body

```json
{
  "name": "Kabir Joshi",
  "age": 20,
  "course": "Web Development",
  "email": "kabir.joshi@example.com"
}
```

All four fields are required for `POST`. The `age` must be a positive whole number.

### Example PUT Request Body

PUT accepts one or more of the following fields:

```json
{
  "course": "Advanced Web Development",
  "age": 21
}
```

## Expected Responses and Status Codes

- **200 OK**: Successful GET, PUT, DELETE, or health check.
- **201 Created**: Student was successfully created.
- **400 Bad Request**: Required data is missing or input is invalid.
- **404 Not Found**: The student or route does not exist.
- **500 Internal Server Error**: Unexpected server-side error.

Example not-found response:

```json
{
  "error": "Student not found"
}
```

Example invalid-input response:

```json
{
  "error": "Name, age, course and email are required"
}
```

## Postman Testing Instructions

1. Start the server with `npm start`.
2. Open Postman.
3. Import `Student_Management_API.postman_collection.json`.
4. Run the requests in this order:
   - GET all students
   - GET student by ID using ID `1`
   - POST a new student using the example body
   - PUT student ID `1` with an update body
   - DELETE the newly created student using the ID returned by POST
5. Also test these error cases:
   - GET `/students/9999` and confirm status `404`.
   - POST `/students` with an empty body and confirm status `400`.
   - PUT `/students/9999` and confirm status `404`.
   - DELETE `/students/9999` and confirm status `404`.

The logger prints the timestamp, HTTP method, and URL for every request in the terminal.

## Viva Explanation

- `app.js` creates the Express application, enables JSON request bodies, registers middleware, mounts the student routes, and handles unknown routes and server errors.
- `data/students.js` exports the array containing the sample student records.
- `middleware/logger.js` is custom middleware that logs request details before passing control to the next handler.
- `routes/studentRoutes.js` contains all five CRUD endpoints and their validation logic.
- `package.json` lists the project dependencies and run commands.
- `Student_Management_API.postman_collection.json` contains ready-to-run Postman requests.

Because the data is stored only in an array, changes are reset whenever the server restarts. This is intentional for the assignment.
