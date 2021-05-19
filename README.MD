# Docker error code

**Add Postgress_DB to your Local**
`$psql`

`#CREATE DATABASE <database name>;`

Make sure you have ";" semicolon there.

use `\l` to list.

**Failed to bind tcp 0.0.0.0:5432 address already in use**

`sudo lsof -i :5432`

Get the PID number and enter below.

`sudo kill <PID>`

# For this DB

Make sure to create .env file.

```
POSTGRES_PASSWORD=password
POSTGRES_USER=user
POSTGRES_DB=dbname
JWT_SECRET=yoursecrethere
```

## To run the the file

Make sure to turn on docker before run.

`docker compose up`

Make sure docker is down every single time before closing.

`docker compose down`

While docker is running. On the other tab:

`npm run serve`

Other npm is:

- "start": run the node file
- "dev": run the nodemon on file
- "migrate": migrate the latest db
- "seed": run the db seed
- "rollback": return to db original state, remove seed
- "serve": rollback -> migrate -> seed -> run dev
