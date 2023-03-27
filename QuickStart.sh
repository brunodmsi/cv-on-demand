#!/bin/bash

source docker.env

_DOCKER_COMPOSE_="docker-compose --env-file docker.env --file docker-compose.yml --project-name ${project}"
${_DOCKER_COMPOSE_} config
${_DOCKER_COMPOSE_} up --build -d

