# Store API

A robust RESTful API built with Node.js, Express, and TypeScript, serving as the backend for the Store App. It features a lightweight JSON-based database with persistence and standardized error handling.

## Technologies Used

- **Node.js**: Modern JavaScript runtime.
- **Express**: Fast, minimalist web framework.
- **TypeScript**: For type-safe development and improved developer experience.
- **CORS**: Middleware for secure Cross-Origin Resource Sharing.
- **Nodemon**: Hot-reloading development environment.

## Key Features

- **Standardized Error Handling**: Centralized `errorHandler` and `asyncHandler` middleware for consistent API responses.
- **Persistence Layer**: Custom file I/O utilities for managing the `db.json` data store.
- **Type Safety**: Shared TypeScript interfaces to ensure data integrity across the backend.
- **Modular Routes**: Organized routing structure for scalability.

## Project Structure

```text
api/
├── db.json                 # Persistent data storage
├── src/
│   ├── index.ts            # Entry point & express setup
│   ├── config.ts           # Environment configuration
│   ├── controllers/        # Request handlers (business logic)
│   ├── middleware/         # Async & global error handlers
│   ├── routes/             # API route definitions
│   ├── utils.ts            # Database I/O utilities
│   ├── types.ts            # TypeScript data models
│   └── constants.ts        # Reusable API constants
├── package.json            # NPM scripts & dependencies
└── tsconfig.json           # TypeScript build configuration
```

## Getting Started

### Installation

```bash
npm install
```

### Running the Project

#### Development Mode (Recommended)

Automatically restarts on file changes:

```bash
npm run dev
```

#### Production Build

Compiles to JavaScript and runs the performance-optimized bundle:

```bash
npm run build
npm start
```

## API Reference

All endpoints are versioned and prefixed with `/api/v1`.

### Items Management

| Method   | Endpoint     | Description                  |
| :------- | :----------- | :--------------------------- |
| `GET`    | `/items`     | Retrieve all items           |
| `GET`    | `/items/:id` | Retrieve detailed item by ID |
| `POST`   | `/items`     | Create a new item entry      |
| `PUT`    | `/items/:id` | Update item details          |
| `DELETE` | `/items/:id` | Permanent item removal       |
