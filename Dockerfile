###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18-alpine as development

# Create app directory in container
WORKDIR /

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY package*.json ./

# Install app dependencies using the `npm ci` command instead of `npm install`
RUN npm ci

# Bundle app source
COPY . .

# Run a command against the development stage of the image
CMD ["npm", "run", "dev"]