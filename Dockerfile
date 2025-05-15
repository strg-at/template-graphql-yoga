FROM node:22.15.0-alpine@sha256:ad1aedbcc1b0575074a91ac146d6956476c1f9985994810e4ee02efd932a68fd AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run lint

RUN npm run test

RUN npm run build

RUN npm ci --omit=dev

FROM node:22.15.0-alpine@sha256:ad1aedbcc1b0575074a91ac146d6956476c1f9985994810e4ee02efd932a68fd

WORKDIR /app

COPY package*.json ./
COPY --from=build /app/dist /app/dist
COPY --from=build /app/node_modules /app/node_modules
COPY ./resources ./resources

# switch to user node (uid=1000)
USER node

EXPOSE 4000

CMD [ "npm", "run", "service"]
