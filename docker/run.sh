#!/bin/bash
#command to start
startCommand="/usr/bin/npm start";
#local html directory
app="${PWD}/..";
#remove existing container
docker rm -f "logger"
#run
docker run --name="logger" -p 32888:32888 -e startCommand="$startCommand" -v $app:/root/app -d logger
