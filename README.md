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
2. Run `docker-compose up -d`
3. Visit the frontend at `http://localhost:8080/`
4. Visit the backend at `http://localhost:3001/`. `http://localhost:3001/api/jobs` demonstrates a working return of some prestored jobs.
5. A Swagger documented has been included for your convience at `http://localhost:0214/`

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
