# eInvoicing Storage Platform

A full-stack web app for storing, sending and managing electronic invoices. Built by team **H10A Brownie** for SENG2021 at UNSW, Term 1 2023.

This is a public copy of the original university repositories, which were private to the course.

## Features

- Account registration, login, logout and password reset
- Upload, create and modify eInvoices
- View sent and received invoices, with search and filtering
- Invoice preview before submitting
- Light and dark themes, plus accessibility settings

## Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | Next.js 13, React 18, TypeScript, React Bootstrap, Sass |
| Backend | Node.js, Express, TypeScript, PostgreSQL (`pg`) |
| Testing | Jest, ts-jest, nyc (coverage) |
| CI/CD | GitHub Actions, deployed to AWS Elastic Beanstalk |

## Project Structure

```
├── Backend/    # REST API (Express + PostgreSQL)
└── Frontend/   # Web client (Next.js)
```

## API Endpoints

| Method | Route | Description |
|---|---|---|
| GET | `/healthcheck` | Service health check |
| POST | `/auth/register` | Create an account |
| POST | `/auth/login` | Log in and receive a session token |
| POST | `/auth/logout` | End a session |
| POST | `/invoice/upload` | Store a new invoice |
| GET | `/invoice/retrieval` | Fetch an invoice by ID |
| PUT | `/invoice/modify` | Update an existing invoice |
| GET | `/invoice/list` | List a user's invoices, with optional filter |

## Running Locally

**Requirements:** Node.js 16+, PostgreSQL

### Backend

```bash
cd Backend
npm install
npm start          # runs on http://localhost:3200
npm test           # runs the Jest test suite
```

Database connection settings are read from the environment variables `RDS_HOSTNAME`, `RDS_DB_NAME`, `RDS_PASSWORD` and `RDS_PORT`. If they're not set, it falls back to a local `postgres` database. See [`Backend/dbsetup.md`](Backend/dbsetup.md) for database setup.

### Frontend

```bash
cd Frontend
npm install
npm run dev        # runs on http://localhost:3000
```

> **Note:** The frontend calls the original AWS deployment, which is no longer live. To run the full stack locally, change the API URLs in `Frontend/src` to point to `http://localhost:3200`.

## Team

Built by Tony Nguyen, James Treloar, Vincent Marcus Ramirez and Aidan Tan.
