#!/bin/bash

docker-compose -p tests \
  run -p 3000 --rm web npm run watch-tests