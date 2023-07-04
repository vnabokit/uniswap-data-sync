# Periodic Subgraph Data Synchronisation

NestJS backend application that periodically fetches data from the Uniswap subgraph and stores the data in a database.

## Stack

- NestJS
- TypeScript
- PostgreSQL
- TypeORM
- GraphQL

## Database schema

```
CREATE TABLE IF NOT EXISTS pairs (
      pair TEXT NOT NULL PRIMARY KEY UNIQUE,
      token0 TEXT NOT NULL,
      token1 TEXT NOT NULL
    )
```

## Project running

1. Clone the project from the git repository

2. Rename folder `./env.example` to `./env`

3. Edit connection settings to your PostgreSQL database in the file `./env/dev.env`

4. Make sure the PostgreSQL service is up and the database is available

5. Open a command line tool, navigate to the project's root

6. Launch `npm i`, wait until all packages are installed.

7. Launch `npm run start:dev`

8. Now you have two options: send GET reguest to `http://localhost:<APP_PORT>` or wait until the cron job launches the fetching data automatically. Fetching data happens each 30 minutes.

## Check results

Use your favorite tool to send a `SELECT` SQL query for retrieving data from the `pairs` table and explore results.

## Updating data

After each fetching, the data is updated in the DB. Updating is occurred by the `pair` field.
