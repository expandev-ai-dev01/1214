# Gerenciador de Hábitos - Backend API

Backend REST API for the Habit Tracker System.

## Technology Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Architecture**: REST API
- **Storage**: In-memory (no database persistence)

## Project Structure

```
src/
├── api/                    # API Controllers
│   └── v1/                 # API Version 1
│       ├── external/       # Public endpoints
│       └── internal/       # Authenticated endpoints
├── routes/                 # Route definitions
│   ├── v1/                 # Version 1 routes
│   └── index.ts            # Main router
├── middleware/             # Express middleware
├── services/               # Business logic
├── utils/                  # Utility functions
├── constants/              # Application constants
├── instances/              # Service instances
├── tests/                  # Global test utilities
└── server.ts               # Application entry point
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env with your configuration
```

### Development

```bash
# Start development server with hot reload
npm run dev

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate test coverage
npm run test:coverage

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix
```

### Production

```bash
# Build for production
npm run build

# Start production server
npm start
```

## API Documentation

### Base URL

- Development: `http://localhost:3000/api/v1`
- Production: `https://api.yourdomain.com/api/v1`

### Health Check

```
GET /health
```

Returns server health status.

### API Versioning

The API uses URL path versioning:
- `/api/v1/external/*` - Public endpoints
- `/api/v1/internal/*` - Authenticated endpoints

## Features

This backend supports the following features:

1. **Habit Registration** - Create and manage habits
2. **Completion Tracking** - Mark habits as completed
3. **Habit Visualization** - View all registered habits
4. **Progress Statistics** - Track habit completion statistics
5. **Reminders** - Notification system for habit reminders
6. **Habit Categorization** - Organize habits by categories
7. **Account Settings** - Manage user preferences

## Development Guidelines

### Code Style

- Use 2 spaces for indentation
- Maximum line length: 120 characters
- Use single quotes for strings
- Always use semicolons
- Follow TypeScript strict mode

### Testing

- Write unit tests for all service functions
- Write integration tests for API endpoints
- Maintain minimum 80% code coverage
- Place test files alongside source files

### Commit Messages

Follow conventional commits:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `test:` - Test additions or changes
- `refactor:` - Code refactoring

## License

ISC