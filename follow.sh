#!/bin/bash
docker logs -f --tail="1" logger | grep "$1"
