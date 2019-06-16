FROM node:12 as base
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN npm install -s

FROM node:12 as production
COPY --from=base /usr/src/app ./
RUN npm run build
