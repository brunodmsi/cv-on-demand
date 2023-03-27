FROM node:lts as base

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install --quiet

RUN apt-get update \
	&& apt-get install -y texlive-latex-base \
	&& apt-get install -y texlive-fonts-extra \
	&& apt-get install -y texlive-latex-extra

COPY . .
