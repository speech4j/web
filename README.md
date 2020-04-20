# Web 

[![Build Status](https://travis-ci.com/speech4j/web.svg?branch=master)](https://travis-ci.com/speech4j/web) [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=speech4j_speech-to-text-comparator-ui&metric=alert_status)](https://sonarcloud.io/dashboard?id=speech4j_speech-to-text-comparator-ui)

[![SonarCloud](https://sonarcloud.io/images/project_badges/sonarcloud-white.svg)](https://sonarcloud.io/dashboard?id=speech4j_speech-to-text-comparator-ui)


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.1.

Navigate https://speech4jweb.herokuapp.com to enter development environment

Navigate https://ej0kal.axshare.com/ to view current prototype of the project (authorized users only)

## :whale: Docker

In order to spin up this app you don't need to download any additional software like nginx, angular-cli, nodejs etc.
You can start the ball rolling just by firing it up inside your docker environment


### :wrench: Development environment


For development purposes use `Dockerfile.dev` and `docker-compose-dev.yml`.


#### :blue_book: Dockerfile.dev

Using these commands enables you to change files locally and view them live inside your running docker container with
live reload browser feature without installing additional dependencies and other angular-ish stuff.

Building development image: 

`docker build -f Dockerfile.dev -t web:dev .`.

Running development image: 

`docker run -it --name=web-dev -v ${PWD}:/web -v /web/node_modules -p 4201:4200 --rm web:dev`.

Navigate to `localhost:4201` to check if application started normally.

Try to change some css or html properties and check if your changes have some impact on the application state 
(Browser should reload the page as if it was running locally after saving changes). 

Running unit and e2e tests: 

`docker exec -it web-dev ng test --watch=false`

`docker exec -it web-dev e2e --port 4202`. 

Where `web-dev` is your container name defined in previous `docker run --name=` argument.


#### :closed_book: docker-compose-dev.yml

Running and building from Dockerfile.dev: 

`docker-compose -f docker-compose-dev.yml up --build`. Add `-d` flag if you need to run in a detached mode.

Running unit and e2e tests with docker-compose:

`docker-compose exec web-dev ng test --watch=false`

`docker-compose exec ng e2e --port 4202`.


### :rocket: Production environment

This is production ready enviroment so you won't be able to experience live reload feature and the link between your local files
and docker running container unlike in the Development environment. 


#### :blue_book: Dockerfile

For production environment with use docker feature multi-stage builds to push our dist folder content into nginx web-server image.

Building development image: 

`docker build -t web:prod .`.

Running development image: 

`docker run -it --name=web-prod -p 80:80 --rm web:prod`.


#### :closed_book: docker-compose.yml

Firing up the container: 

`docker-compose up --build`. Add `-d` flag if you need to run in a detached mode.

Navigate to `localhost:80` to check if application started normally.
