# BACKEND STEPS
1. npm init -y
2. Starting package npm install: `npm install express @prisma/client cors dotenv tsconfig-paths`
3. Starting package for npm dev depencies: `npm install -D prisma typescript ts-node nodemon @types/express @types/node @types/cors @types/node`
4. Setup the package.json for scripts
5. Add tsconfig.json (this is pre-defined but more likely a configuration for TypeScript rules)
6. Create the .env file for secret credentials
7. Setup the Source folder structures (controllers, repositories, routes, services)
8. Setup Prisma ORM
9. Setup PostgreSQL (Choose pgAdmin 4 - PostgreSQL for local development and Neon for Cloud/Online Database): `postgresql://{username}:{password}@localhost:5432/{databaseName}?schema=public`
10. Happy Coding!


# QUICK START
`npm run dev`