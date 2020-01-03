# Masterplanner [![Netlify Status](https://api.netlify.com/api/v1/badges/07d2cba9-2dc7-4278-9324-be5d635d7efa/deploy-status)](https://app.netlify.com/sites/masterplanner/deploys)

Modern software for event organizers

## Quick start

Install dependencies

```bash
npm install
```

Copy the example environment variables and set them

```bash
cp .example.env .env
```

Start the local server with a default 3000 port

```bash
npm start
```

## Migrations and seeds

Create a new migration for the table `foo`.

The new migration must have the `up` and `down` methods defined.

```bash
npx migrate create foo
```

Migrate everything in the `migrations` folder

```bash
npm run migrate
```

Create a new seed by prefixing it with the order you want to have.

The new seed must have a `run` method defined.

```bash
echo "module.exports.run = () => {}" > seeds/007_foo.js
```

Then seed the database with files in the `seeds` folder

```bash
npm run seed
```

Remove every migration

```bash
npm run migrate:down
```

## API

The API is designed as an Express app, exported as a lambda function.

This takes advantage of explicit routing and middleware you are already familiar with, in the serverless world.

These lambda functions use the config object provided in the `config` folder. [Debugging is enabled](https://www.npmjs.com/package/netlify-lambda#debugging) by default for the development environment.

## Deployment

### Netlify

On Netlify, in order to skip the installation of `devDependencies`, add `NODE_ENV=production` to the environment variables. [See this article](https://docs.netlify.com/configure-builds/manage-dependencies/#node-js-environment) for reference.
