# REST in Peace: The Rise of GraphQL

## Orlando Code Camp 2018

### Presented by Eric Nograles

## Overview

An example full stack GraphQL application using Apollo Server and Client. Presented on Orlando Code Camp 2018 by Eric Nograles

This application demonstrates all facets of GraphQL: Queries, Mutations, and Subscriptions, and how they might tie into a React application.

This application also demonstrates how GraphQL may eliminate the need of a state management library (e.g. Redux, MobX, RxJS) entirely! [See how we did it on this PR.](https://github.com/ericnograles/orlandocc-2018-graphql/pull/1)

## Prerequisites

1. [Visual Studio Code](https://code.visualstudio.com/)
1. [Docker](https://www.docker.com/)
1. At the root of this repo, execute `docker-compose build`

## Quick Setup

### Scaffolding

1. At the root of this repo, execute `docker-compose up`
1. Once you see your container running as indicated by the message `orlandocc_2018_graphql_redis | 1:M 11 Mar 11:06:46.779 * The server is now ready to accept connections on port 6379`
1. To stop all the code and infrastructure, press Ctrl + C from this terminal
1. To delete all of the infrastructure and start from scratch, at the root of this repo (after stopping it with Ctrl + C), execute `docker-compose down && ./docker_clean.sh && docker-compose up`

### GraphQL

1. Open a terminal and execute `./docker_bash.sh` or `./docker_zsh.sh` to open a bash or zsh into the container
1. Execute `yarn run develop:api` in the bash of the container
1. Open `http://localhost:62002/explorer` in a browser for the GraphiQL Explorer
   * **Note**: Any changes in `api` will reflect in your Docker container automatically thanks to Nodemon
1. To debug the Web API, attach your favorite Node Editor/IDE's debugger to `localhost:62003`

### Web Client

1. Open a terminal and execute `./docker_bash.sh` or `./docker_zsh.sh` to open a bash or zsh into the container
1. Execute `yarn run develop:client` in the bash of the container
1. Open `http://localhost:62004` for the `create-react-app` dev server

## Troubleshooting

### ENOSPC Issues With Docker

If you are doing heavy development in Docker and aren't actively removing volumes, you might run into an ENOSPC problem when you execute `docker-compose build` or `docker-compose up`.  

To alleviate this, execute `./docker_clean.sh` in a Terminal then attempt to do another `docker-compose build` or `docker-compose up`.

This command deletes and "dangling" volumes and images -- that is, any volumes or images that are orphaned because of prior `docker-compose build` or container removals.



