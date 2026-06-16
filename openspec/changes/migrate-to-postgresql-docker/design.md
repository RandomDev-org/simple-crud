## Context

The current application uses SQLite via the `better-sqlite3` library. While convenient for initial development, SQLite has limitations for production-like environments, including difficulty in multi-user concurrent access and lack of network isolation. This change introduces PostgreSQL as the primary database, running in a Docker container to ensure environment consistency and ease of setup.

## Goals / Non-Goals

**Goals:**
- Containerize PostgreSQL using Docker Compose.
- Replace `better-sqlite3` with `pg` (node-postgres).
- Implement environment-based configuration via `.env`.
- Ensure schema is automatically created on startup if missing.
- Maintain existing API behavior and endpoint signatures.

**Non-Goals:**
- Migration of existing data from `datos.db` to PostgreSQL.
- Implementation of a full-featured migration framework (e.g., Knex, Sequelize).
- Deployment to cloud environments or Kubernetes.

## Decisions

### Database Driver: `pg` (node-postgres)
**Decision**: Use `pg` as the database client.
**Rationale**: It is the industry-standard, lightweight, and high-performance driver for PostgreSQL in Node.js. It supports connection pooling natively.
**Alternatives**:
- `Sequelize/TypeORM`: Dismissed to avoid the overhead of a full ORM for this simple CRUD application.
- `Slonik`: Dismissed to favor a more common and well-documented library for this project's scale.

### Docker Image: `postgres:16-alpine`
**Decision**: Use the Alpine-based PostgreSQL 16 image.
**Rationale**: Version 16 provides the latest stable features, and the Alpine variant ensures a minimal image size.

### Schema Initialization
**Decision**: Execute raw DDL scripts in `src/storage/db.js` during the application initialization phase.
**Rationale**: Given the simple schema (2 tables), manual DDL execution is sufficient and keeps dependencies low. The application will use `CREATE TABLE IF NOT EXISTS` to ensure idempotency.

### Connection Management: `pg.Pool`
**Decision**: Use `pg.Pool` for managing database connections.
**Rationale**: Reusing connections from a pool is more efficient than opening a new connection for every request, especially in a containerized environment where network latency might be slightly higher.

## Risks / Trade-offs

- **[Risk] Docker Dependency**: Developers must have Docker installed and running. → **Mitigation**: Update README (out of scope for this change but recommended) and provide a clear `.env.example`.
- **[Risk] Connection Latency**: PostgreSQL is network-based unlike SQLite's file-based access. → **Mitigation**: Use `pg.Pool` to minimize the cost of establishing connections.
- **[Risk] SQL Dialect Differences**: PostgreSQL and SQLite have slight differences in SQL syntax (e.g., types, autoincrement). → **Mitigation**: Use standard SQL and adapt specific keywords (e.g., `SERIAL` instead of `INTEGER PRIMARY KEY AUTOINCREMENT`).
