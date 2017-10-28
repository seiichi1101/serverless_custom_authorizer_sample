#!bin/bash
rm -rf insides/*
aws lambda get-function --function-name ${1} | grep Location | awk '{print$2}' | xargs curl -o ./insides/${1}.zip
unzip ./insides/${1}.zip -d insides
