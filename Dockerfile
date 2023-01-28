# ==== CONFIGURE =====
# Use a Node 16 base image
FROM node:16-alpine AS BUILDER
# Set the working directory to /app inside the container
WORKDIR /app
# Copy app files
COPY . .
# ==== BUILD =====
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm ci 
# Install serve
# RUN npm install serve
# Build the app
RUN npm run build
# ==== RUN =======
# Set the env to "production"
ENV NODE_ENV production
# ==== SERVER ====
FROM nginx:1.19-alpine AS server
COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder ./app/build /usr/share/nginx/html
# Expose the port on which the app will be running (3000 is the default that `serve` uses)
# EXPOSE 3000
# Start the app
# CMD [ "npx", "serve", "build" ]