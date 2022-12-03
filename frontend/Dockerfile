FROM node:16-alpine AS builder

WORKDIR /usr/src/app/frontend

COPY ["package*.json", "./"]

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf *

COPY --from=builder /usr/src/app/frontend/dist .

ENTRYPOINT ["nginx", "-g", "daemon off;"]
