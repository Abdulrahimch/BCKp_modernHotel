FROM node:12.19.0

WORKDIR /app

COPY package*.json ./app/

RUN npm install env-cmd --save-dev

RUN npm config set save-exact=true
RUN npm install -g nodemon
RUN npm install

COPY . /app

WORKDIR /app/nodejs_backend

CMD ["npm", "start"]






