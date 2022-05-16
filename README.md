# Adonis-JS-Tuto-Blog

A blog crud example using Adonis JS 5 framework, running with Bootstrap 5, Webpack Encore, Sass and a MariaDB container.

This is based on a [tutorial made by Grafikart](https://www.youtube.com/watch?v=i51olb4HBgU).

## Requirements

- docker version >= 20.10.11
- docker-compose version >= 1.29.2
- nodeJS version >= 16.14.0
- pnpm version >= 6.32.0

## Startup

- Launch MariaDB Database, MailDev & Adminer : `docker-compose up -d`
- Run db migrations : `node ace migration:run`
- Run seeds / fixtures : `node ace db:seed`
- Start dev server : `pnpm dev`

## Services

You should have the following service running :

- AdonisJS app on `localhost:3333`
- Adminer on port `localhost:9000`
- MailDev on port `localhost:1080`

## Functionalities

- Crud on articles
- Send email via contact form - *TODO*