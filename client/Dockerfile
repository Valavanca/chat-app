FROM node:9-alpine

ADD package.json /package.json
RUN yarn

WORKDIR /app
ADD . /app

ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin

EXPOSE 5000

CMD ["npm", "run", "serve"]