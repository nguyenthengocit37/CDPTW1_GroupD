FROM node:16-alpine
#App directory
WORKDIR /usr/src/app/backend
ENV DB_HOST='MYSQL5045.site4now.net'
ENV DB_USER='a90c6d_groupd'
ENV DB_PASSWORD='cdptw2groupD'
ENV DB_NAME='db_a90c6d_groupd'
COPY package*.json ./

RUN npm install

#Copy all from current directory to App directorys
COPY . .

RUN npm i -g @nestjs/cli

CMD [ "npm","run","start:dev"]