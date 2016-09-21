#!/bin/bash

AWS_REGION=
ECR_REPOSITORY_URI=
GIT_COMMIT=

INSTANCE=$(curl -s http://instance-data/latest/meta-data/instance-id)
LOG_GROUP=$(aws --region $AWS_REGION ec2 describe-tags --filters "Name=resource-id,Values=$INSTANCE" "Name=key,Values=LogGroup" --output text | awk '{print $5}')

docker run -d                           \
  --env=BABBAGE_URL=http://babbage:8080 \
  --env=ZEBEDEE_URL=http://zebedee:8080 \
  --log-driver=awslogs                  \
  --log-opt=awslogs-group=$LOG_GROUP    \
  --log-opt=awslogs-stream=florence     \
  --name=florence                       \
  --net=publishing                      \
  --restart=always                      \
  $ECR_REPOSITORY_URI/florence:$GIT_COMMIT
