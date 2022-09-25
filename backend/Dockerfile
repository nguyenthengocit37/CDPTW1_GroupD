FROM node:16-alpine
#App directory
WORKDIR /usr/src/app/backend

COPY package*.json ./

RUN npm i -g @nestjs/cli
RUN npm install

#Copy all from current directory to App directorys
COPY . .

CMD [ "npm","start"]