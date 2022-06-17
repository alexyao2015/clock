FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:bullseye

RUN set -x \
    && sudo apt-get update \
    && sudo apt-get install -y iputils-ping \
    && npm install --global yarn
