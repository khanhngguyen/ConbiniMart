FROM node:18-alpine

WORKDIR /app

COPY ["package.json", "package-lock.json*", "/app/"]
RUN npm install --production
RUN npm install --save-dev @babel/plugin-transform-private-property-in-object
# RUN npm install --save @babel/plugin-proposal-private-property-in-object
# ENV PATH /data/node_modules/.bin

COPY . .
CMD [ "npm", "start" ]