## Why

The project currently relies on SQLite for data persistence, which is less suitable for production-like environments and requires local file management. Migrating to PostgreSQL running in a Docker container provides a scalable, isolated, and consistent database environment that is easy to set up and maintain without requiring a local PostgreSQL installation.

## What Changes

- **Database Engine**: Replace SQLite (`better-sqlite3`) with PostgreSQL.
- **Infrastructure**: Add a `docker-compose.yml` file to manage the PostgreSQL service.
- **Environment Management**: Implement `.env` for database configuration (host, port, user, password, database name).
- **Persistence Layer**: Refactor `src/storage/db.js` and service layers to use the `pg` (node-postgres) library instead of `better-sqlite3`.
- **Dependency Management**: Remove `better-sqlite3` and add `pg` and `dotenv` to `package.json`.

## Capabilities

### New Capabilities
- `postgres-persistence`: Orchestration and connection logic for a PostgreSQL containerized database.

### Modified Capabilities
None. The functional requirements and API interface remain unchanged.

## Impact

- **Storage**: `datos.db` will be replaced by a PostgreSQL volume.
- **Environment**: Developer workflow will now require Docker to be installed and running.
- **Dependencies**: `package.json` will be updated to include `pg` and `dotenv`.
- **Architecture**: The application will shift from a file-based database to a network-based one.
