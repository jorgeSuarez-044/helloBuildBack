#!/bin/bash

branch=$1
commit=$(echo "${@:2}")

# echo "Branch is '${branch}'"
# echo "Commit message is '${commit}'"

if [[ $branch =~ ^(master|qa|dev)$ ]]; then
  echo 1
  exit 0
fi

deploy_keyword="[deploy]"
deploy_keyword_length=$((${#deploy_keyword} + 1))
commit_msg_length=${#commit}

if [[ $commit_msg_length -gt $deploy_keyword_length ]] && [[ $commit == "$deploy_keyword"* ]]; then
  echo 1
  exit 0
fi

if [[ $commit_msg_length -gt $deploy_keyword_length ]] && [[ $commit == *"$deploy_keyword" ]]; then
  echo 1
  exit 0
fi

echo 0
