# Job Marketplace

This project is a simplified job marketplace where users can post contract jobs and place bids on them.

---

## Project Setup

The project contains the following main directories:

- **Frontend (React with NX framework)**: Located in the `/frontend` directory.
- **Backend (TypeScript Express API)**: Located in the `/backend` directory. The backend uses SQLite for storage.

The setup here is for your convenience. If you'd like to reach for different technology, you're welcome to do so.

### Prerequisites

1. Make sure you have everything downloaded locally. You should set up a new git repository.
1. Have [Docker installed](https://www.docker.com/get-started/).

### Running the build

1. Navigate to the root directory.
2. Run `docker-compose up -d` if no changes are reflected run `docker-compose up --build`
3. Visit the frontend at `http://localhost:8080/`
4. Visit the backend at `http://localhost:3001/`. `http://localhost:3001/api/jobs` demonstrates a working return of some prestored jobs.
5. A Swagger document has been included for your convience at `http://localhost:2140/`. It's ready with api information, examples, and since it's also docker hosted, you can directly make backend calls theres.

### TODO - If time permits, some pertinent things to consider
0. NX integration to share models and components between applications
1. A static database so data can continue to persist and regressions can be created to interact with the data
2. Optimized queries and bid/job storage
3. Cleaner validations and more data provided in the front end for the end user
4. Deployed remote environment for end to end integration tests
5. Cypress-like testing for UI

### Application Technical Decisions
Technology provided was the React - Express - Sqlite stack
React - Application was designed as a single page application with small amounts of routing. The application itself is basic in nature and doesn't require a large ecosystem outside of the SPA. 
    Material UI was used for a component library as it's consistent, clean, and easy to use.
    Jest was used on the front end to test as it's an expandable library that meets basic needs. Cypress is prefered in the future since it can better simulate a user. 
    JOI was carried over from the back end for validations.
Express - Easy to spin up back end with an available integration with Reach through NX.
    JOI was used as a validation library as it's easy to use with some built in logic.
    SQLite3 was provided and used as it's easy to use with the DB setup.
    Jest was once again used to test - able to mock calls and check coverage.
Sqlite - Easy to spin up sql database and easily migratable into other relational databases.

In general, as as POC this tech stack allowed a user to spin up the application easily and expand in scale. 
React performs as well as other SPA applications and is an excellent choice for lightweight and has excellent support.
Express in general could perform worse than something like Spring in an enterprise evironment with it missing features like multithreading and JVM optimizations.
Sqlite is a POC type database and should generally be transitioned to a full scale relational DB for better performance.


---

## Technical Requirements

### User Stories

#### View Home Page

- Displays the 5 most recently published job postings.
- Displays the top 5 most active and open jobs (measured by the number of bids).
- Includes a link to publish a new job posting.

#### Post New Job

- Form to collect job description, requirements, name, and contact info of the poster.

#### View Job Details

- Displays job description, requirements, poster’s name, and contact info.
- Displays the current lowest bid amount.
- Displays the number of bids.
- Displays the auction expiration date/time and the time remaining to bid.
- Includes a form for placing a new bid.

---

## Project Requirements

### Backend

Provide a RESTful API with SQLite storage. The following endpoints need to be implemented:

- `POST /api/jobs`: Create a new job posting.
- `GET /api/jobs`: Get all job postings (with optional filtering for recently posted and most active).
- `GET /api/jobs/:id`: Get details of a specific job posting.
- `POST /api/jobs/:id/bids`: Place a new bid on a specific job.

### Frontend

Create a user-friendly interface using React (managed by NX):

- **Home Page**: Displays the 5 most recent and 5 most active job postings with links to job details and posting a new job.
- **New Job Page**: Form to create a new job posting.
- **Job Details Page**: Displays job details and allows placing a new bid.

---

## Non-Functional Requirements

- **Error Handling**: Basic error handling on both backend and frontend.
- **Code Quality**: Follow best practices for code quality, including naming conventions and modularity.
- **Documentation**: Include a README file with setup and run instructions.
- **Automated Testing**: Basic unit tests for both frontend and backend.

---
