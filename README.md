# orlandocc-2018-graphql

## Overview

An example full stack GraphQL application using Apollo

## Prerequisites

1. [Visual Studio Code](https://code.visualstudio.com/)
1. [Docker](https://www.docker.com/)
1. At the root of this repo, execute `docker-compose build`

## Quick Setup

### Scaffolding

1. At the root of this repo, execute `docker-compose up`
1. Once you see your container running as indicated by the message `LOG: database system is ready to accept connections`
1. To stop all the code and infrastructure, press Ctrl + C from this terminal
1. To delete all of the infrastructure and start from scratch, at the root of this repo, execute `docker-compose down && ./docker_clean.sh && docker-compose up`

### GraphQL

1. Open a terminal and execute `./docker_bash.sh` to open a bash into the container
1. Execute `yarn run develop:api` in the bash of the container
1. Open `http://localhost:62002/explorer` in a browser for the GraphiQL Explorer
   * **Note**: Any changes in `api` will reflect in your Docker container automatically thanks to Nodemon
1. To debug the Web API, attach your favorite Node Editor/IDE's debugger to `localhost:62003`

### Web Client

1. Open a terminal and execute `./docker_bash.sh` to open a bash into the container
1. Execute `yarn run develop:client` in the bash of the container
1. Open `http://localhost:62004` for the `create-react-app` dev server

## Troubleshooting

### ENOSPC Issues With Docker

If you are doing heavy development in Docker and aren't actively removing volumes, you might run into an ENOSPC problem when you execute `docker-compose build` or `docker-compose up`.  

To alleviate this, execute `./docker_clean.sh` in a Terminal then attempt to do another `docker-compose build` or `docker-compose up`.

This command deletes and "dangling" volumes and images -- that is, any volumes or images that are orphaned because of prior `docker-compose build` or container removals.



