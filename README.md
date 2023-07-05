# Periodic Subgraph Data Synchronisation

NestJS backend application that periodically fetches data from the Uniswap subgraph and stores the data in a database.

## Stack

- NestJS
- TypeScript
- PostgreSQL
- TypeORM
- GraphQL
- Docker

## Database schema

```
CREATE TABLE IF NOT EXISTS pairs (
      pair TEXT NOT NULL PRIMARY KEY UNIQUE,
      token0 TEXT NOT NULL,
      token1 TEXT NOT NULL
    )
```

## Project running

### Without Docker

1. Clone the project from the git repository

2. Rename folder `./env.example` to `./env`

3. Edit connection settings to your PostgreSQL database in the file `./env/dev.env`

4. Make sure the PostgreSQL service is up and the database is available

5. Open a command line tool, navigate to the project's root

6. Launch `npm i`, wait until all packages are installed.

7. Launch `npm run start:dev`

8. Now you have two options: send GET reguest to `http://localhost:<APP_PORT>` or wait until the cron job launches the fetching data automatically. Fetching data happens each 30 minutes.

### With Docker

1. Proceed the steps 1-3 above

2. Open a command line tool, navigate to the project's root

3. Launch the command `docker-compose --env-file ./env/dev.env up -d`

4. Now you have two options: send GET reguest to `http://localhost:3000` or wait until the cron job launches the fetching data automatically. Fetching data happens each 30 minutes.
   Please note that the app's port is hardcoded to `3000`. If you want to change the port to, e.g., `3001`, then:
   - stop and remove related Dockers' containers: `docker-compose stop` then `docker-compose rm`
   - edit the `docker-compose.yaml`: replace `3000:3000` to `3001:3000`
   - start the containers via command from the _step #3_

## Check results

Use your favorite tool to send a `SELECT` SQL query for retrieving data from the `pairs` table and explore results.

If you've launched the app within Docker, then **use port `35432` for connecting to the DB** (the rest of parameters for connection remain without change).

## Updating data

After each fetching, the data is updated in the DB. Updating is occurred by the `pair` field.
