FROM node:16-alpine
#App directory
WORKDIR /usr/src/app/frontend

COPY ["package*.json", "./"]

RUN npm install

#Copy all from current directory to App directorys
COPY . .

CMD [ "npm", "start" ]
