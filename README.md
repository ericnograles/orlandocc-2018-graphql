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

## Quick Start

### Scaffold Docker

1. At the root of this repo, open a bash terminal and execute `docker-compose up`
1. Once you see your container running as indicated by the message `orlandocc_2018_graphql_redis | 1:M 11 Mar 11:06:46.779 * The server is now ready to accept connections on port 6379`
    * To stop all the code and infrastructure, press Ctrl + C from this terminal
    * To delete all of the infrastructure and start from scratch, at the root of this repo (after stopping it with Ctrl + C), execute `docker-compose down && ./docker_clean.sh && docker-compose up`
1. Open another bash terminal and execute `./utils/docker_develop.sh` to bring up the GraphQL API and React Dev Server
    * Hit Ctrl + C in from terminal to bring down the GraphQL API and React Dev Server

### Address Reference

| Type  | Address |
| ------------- | ------------- |
| GraphQL Explorer  | http://localhost:62002/explorer  |
| GraphQL API Root  | http://localhost:62002/api  |
| GraphQL Subscriptions Server  | ws://localhost:62002/  |
| React SPA Dev Server  | http://localhost:62004  |

## Troubleshooting

### ENOSPC Issues With Docker

If you are doing heavy development in Docker and aren't actively removing volumes, you might run into an ENOSPC problem when you execute `docker-compose build` or `docker-compose up`.  

To alleviate this, execute `./docker_clean.sh` in a Terminal then attempt to do another `docker-compose build` or `docker-compose up`.

This command deletes and "dangling" volumes and images -- that is, any volumes or images that are orphaned because of prior `docker-compose build` or container removals.



