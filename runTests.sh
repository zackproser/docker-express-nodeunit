#!/usr/bin/env bash

###############################################
# Runs nodeunit tests - and breaks bad builds
#
# Captures exit code of nodeunit tests and exits
# with it.
#
# Docker will see a non-zero exit status as a failure,
# preventing the Docker build from completing
#

echo "Running nodeunit tests..."

nodeunit tests/example-tests.js > testsOutput

# Inspect the exit code of the last command
if [ $? -eq 0 ]; then
  echo "All tests passed!"
  # This will exit cleanly
  exit 0
else
  echo "ERROR: Not all tests passed! This build will terminate until code is fixed!"
  # This will break the Docker build
  exit 1
fi

# Read the output of the tests to STDOUT
# so they'll be visible during a Docker build
cat testsOutput && rm testsOutput