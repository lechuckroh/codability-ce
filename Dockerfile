FROM node:7.7

MAINTAINER Lechuck Roh <lechuckroh@gmail.com>

ADD . /app

WORKDIR /app
RUN npm install

VOLUME ["/app/logs"]

EXPOSE 3000

ENV NODE_ENV=production

CMD ["npm", "start"]
