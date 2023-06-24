## Sum With Steps - Backend

This is the express app for the Sum With Steps project.

### Requirements:

- [PostgreSQL](https://www.postgresql.org/) (v14.x.x)

### API Routes:

- `POST /api/sum`: Provide 2 numbers, and it will provide step by step instructions on how to add them together.
- `GET /api/sum-logs?page=1&limit=10`: Get a list of all the sums that have been calculated.
- `POST /api/sum-logs`: Create a new sum log.

### API Documentation:

- Import `Sum With Steps.postman_collection.json` into [Postman](https://www.postman.com/) to view the API documentation.
