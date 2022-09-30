FROM node:16-alpine
#App directory
WORKDIR /usr/src/app/backend

COPY package*.json ./

RUN npm install

#Copy all from current directory to App directorys
COPY . .

RUN npm i -g @nestjs/cli

CMD [ "npm","run","start:dev"]