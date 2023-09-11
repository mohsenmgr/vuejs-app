FROM node:12.16.2-alpine AS build

# see:
# https://medium.com/devgorilla/node-gyp-support-in-alpine-linux-9374c6191140
# https://github.com/mhart/alpine-node/issues/27
# https://stackoverflow.com/q/49118579/1849221
RUN apk add --no-cache python make g++

WORKDIR /data/app

COPY *.json ./
RUN npm ci

COPY . .
RUN npm run build


FROM nginx:1.16.1-alpine
COPY --from=build /data/app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY nginx-entrypoint.sh /nginx-entrypoint.sh
COPY inject.template.js /inject.template.js

ENTRYPOINT ["/nginx-entrypoint.sh"]

CMD ["nginx", "-g", "daemon off;"]
