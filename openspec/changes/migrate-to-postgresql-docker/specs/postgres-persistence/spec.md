## ADDED Requirements

### Requirement: PostgreSQL Orchestration
The system SHALL use Docker Compose to manage a PostgreSQL service version 16 or higher.

#### Scenario: Start database service
- **WHEN** the command `docker-compose up -d` is executed
- **THEN** a PostgreSQL container is started and becomes accessible on the configured port

### Requirement: Persistent Storage
The PostgreSQL service SHALL use a named Docker volume to persist data across container restarts and removals.

#### Scenario: Data persistence after restart
- **WHEN** the PostgreSQL container is stopped and then started again
- **THEN** all previously stored data remains available

### Requirement: Environment Configuration
The application SHALL load database connection parameters (host, port, user, password, database name) from environment variables, typically provided via a `.env` file.

#### Scenario: Load credentials from .env
- **WHEN** the application starts and a `.env` file is present
- **THEN** the application uses the credentials from the file to connect to PostgreSQL

### Requirement: Schema Initialization
The application SHALL verify and create the necessary database schema (tables: `profiles`, `places`) upon startup if they do not already exist.

#### Scenario: Initialize empty database
- **WHEN** the application connects to a fresh PostgreSQL instance
- **THEN** it executes the DDL scripts to create `profiles` and `places` tables with correct relations

### Requirement: Connection Pooling
The application SHALL use a connection pool (via `pg.Pool`) to manage multiple concurrent database connections efficiently.

#### Scenario: Handle concurrent requests
- **WHEN** multiple API requests arrive simultaneously
- **THEN** the application reuses connections from the pool instead of creating a new connection per request
