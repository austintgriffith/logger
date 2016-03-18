#!/bin/bash
echo "Link in preinstalled packages...";
ln -s /root/node_modules /root/app/node_modules
echo "Start the app with ${startCommand}...";
cd /root/app;rm -Rf public;${startCommand} > log.txt 2>&1 &
echo "Tail the app...";
tail -f /root/app/log.txt
