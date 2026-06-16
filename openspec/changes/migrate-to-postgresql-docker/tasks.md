## 1. Infrastructure & Dependencies

- [x] 1.1 Create `docker-compose.yml` with PostgreSQL 16 service and named volume
- [x] 1.2 Create `.env.example` with template database credentials
- [x] 1.3 Add `.env` to `.gitignore`
- [x] 1.4 Install `pg` and `dotenv` dependencies and remove `better-sqlite3`

## 2. Persistence Layer Refactor

- [x] 2.1 Update `src/index.js` to load `dotenv` configuration
- [x] 2.2 Refactor `src/storage/db.js` to use `pg.Pool` and handle async initialization
- [x] 2.3 Implement schema creation logic (`profiles`, `places` tables) in `db.js` using PostgreSQL syntax
- [x] 2.4 Update service layers to handle the asynchronous nature of `pg` queries

## 3. Validation & Cleanup

- [ ] 3.1 Launch PostgreSQL container using `docker-compose up -d`
- [ ] 3.2 Run the API validation script `node test-api.js` and ensure all tests pass
- [ ] 3.3 Verify database persistence by restarting the container and checking data
- [ ] 3.4 Remove the legacy SQLite file `datos.db`
