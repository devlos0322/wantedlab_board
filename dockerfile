FROM node:14.17.0

RUN mkdir -p /app

WORKDIR /app

ADD ./ /app

RUN npm install

EXPOSE 8000

CMD ["node", "app.js"]