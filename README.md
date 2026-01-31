# Store API

Simple REST API built with Express and TypeScript for the Store App. It uses a JSON file as a lightweight database.

## Technologies Used

- **Node.js**: JavaScript runtime.
- **TypeScript**: Typed superset of JavaScript.
- **Express**: Fast, unopinionated, minimalist web framework.
- **CORS**: Middleware to enable Cross-Origin Resource Sharing.
- **ts-node**: TypeScript execution engine for Node.js.
- **nodemon**: Monitor for any changes in your source and automatically restart your server.

## Project Structure

```text
api/
├── db.json              # JSON file acting as the database
├── src/
│   ├── index.ts         # Main application entry point and routes
│   ├── constants.ts     # Configuration and constants
│   └── item.ts          # TypeScript interfaces for data models
├── package.json         # Scripts and dependencies
└── tsconfig.json        # TypeScript configuration
```

## Getting Started

### Installation

Install the project dependencies:

```bash
npm install
```

### Running the Project

#### Development Mode

Run the server with automatic reload on changes:

```bash
npm run dev
```

#### Production Mode

Run the server using `ts-node`:

```bash
npm run start
```

The server will be available at `http://localhost:3001`.
