# # stage (1): building the code.
# FROM node:alpine as builder
# WORKDIR /usr/app
# COPY ./package.json ./
# RUN yarn install
# COPY ./ ./
# RUN yarn build


# # stage (2):
# FROM node:alpine
# WORKDIR /usr/app
# COPY ./package.json ./
# RUN yarn install

# COPY --from=builder /usr/app/dist ./dist