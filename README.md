## Description

This is simple csv parser application written in NestJs, a nodeJs framework.

The basic functionality of this project is to accept a csv file, extract the data and store it in a mongoDB.

To run the application, you need to install Docker on your host machine.

NB: There is an authentication part of the system. You will need to sign up, then login to object a JWT token.

Use the token when making request to '/commodities'

## Installation

```bash
$ git clone https://github.com/efocoder/nestjs-csv-parser.git
```

## Running the app

```bash
# One off command to build or rebuild and run the app with logs
$ docker-compose up --build

# One off command to build or rebuild and run the app in detached mode
$ docker-compose up -d --build

# View logs of containers running in detached mode
$ docker-compose logs -f

# Start existing container
$ docker-compose up

# stop container
$ docker-compose stop
```

## Test

```bash
$ yarn run test
```

### Note: In case of "couldn't find package on npm registry" error when starting the container, run the following command in your termianl

```bash
$ npm config set registry https://registry.npmjs.org/
```

## API Usage

Base url: ```localhost:3000/api/v1```

Sign Up: ```POST: /users``` body: ```{"email": "email@email.com", "name": "John", "password": "password"}```

Login: ```POST: /users/login``` body: ```{"email": "email@email.com", "password": "password"}```

Upload CSV: ```POST: /commodities``` and select a file (csv)

Get commodity average price: ```GET: /commodities``` Query params:

TODO:: ```Set up db replica in order the mongo transaction to work```

## License

Nest is [MIT licensed](LICENSE).
