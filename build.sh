#!/bin/bash
set -eux;
port="8999"
if [[ "docker -q" ]]; then
    docker build -t sdtimer .
    docker run -p $port:$port -d sdtimer
    echo "Timer started on port -> $port."
else
    echo "Error: you do not have docker installed on your system. Please do so before running the timer."
fi
