# Sum With Steps

Provide 2 numbers, and it will provide step by step instructions on how to add them together.

## What's inside?

This Monorepo includes the following packages/apps:

### Apps and Packages:

- `server`: an express app
- `web`: A [Next.js](https://nextjs.org/) app
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Requirements:

- [Node.js](https://nodejs.org/en/) (v18.x.x)
- [Yarn](https://yarnpkg.com/) (v1.x.x)

### Server setup:

#### Requirements:

- [PostgreSQL](https://www.postgresql.org/) (v14.x.x)

#### Setup Database:

- Setup .env file in `apps/server` with the following:

```shell
DATABASE_URL=postgres://<username>:<password>@localhost:5432/<database>
```

- Run the following commands:

```shell
cd apps/server
yarn migrate
```

### Web setup:

#### Setup .env file:

- Setup .env file in `apps/web` with the following:

```shell
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```


### Build

To build all apps and packages, run the following command:

```
cd sum-with-steps
yarn build
```

### Develop

To develop all apps and packages, run the following command:

```
cd sum-with-steps
yarn dev
```
