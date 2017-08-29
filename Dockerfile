FROM node:boron

LABEL maintainer="zackproser@gmail.com"

# Set the workdir, the directory in the resulting container
# to which all following paths in this Dockerfile will be relative
WORKDIR /app/

COPY public public/

COPY routes routes/

COPY views views/

COPY tests tests/

ADD app.js package.json runTests.sh /app/

# Prevents excessive npm logging to STDOUT (only errors will be echoed)
ENV NPM_CONFIG_LOGLEVEL error

# Install all node modules; also install nodeunit globally so it can be called in our runTests.sh bash script
RUN npm i && npm i -g nodeunit

# Modify script so it can be run
RUN chmod +x runTests.sh

# Run the tests script, which in turn calls nodeunit
# And exits with the exit status of nodeunit
# Docker will error out if it sees a non-zero exit status from any command
# Therefore, the failure of a single nodeunit test (caused by bad code or project changes)
# will result in the Docker build breaking (so you can't ship it)
RUN /app/runTests.sh

ENTRYPOINT ["node", "app.js"]

