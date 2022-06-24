FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:16-bullseye

RUN set -x \
    && sudo apt-get update \
    && sudo apt-get install -y \
    iputils-ping \
    postgresql-client \
    && npm install --global yarn
