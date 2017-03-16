FROM node:7.7

MAINTAINER Lechuck Roh <lechuckroh@gmail.com>

ADD . /app

VOLUME ["/app/logs"]

EXPOSE 80

CMD ["npm", "start"]
