## Description

This is simple csv parser application written in NestJs, a nodeJs framework.

The basic functionality of this project is to accept a csv file, extract the data and store it in a mongoDB.

To run the application, you need to install Docker on your host machine.

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

## License

Nest is [MIT licensed](LICENSE).
