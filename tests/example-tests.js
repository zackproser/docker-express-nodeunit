const
  nodeunit = require('nodeunit')
  , app = require('../app')
  , request = require('request')
  , httpServer = require('http').createServer(app)
  , testPort = 3333
  , testUriRoot = `http://localhost:${testPort}`

/*
  Run before every individual test

  Loads app.js and its express routes
  in order to create an http server
  and listen on the test port

  @param {Function} setupCallback Function to run when processing is complete
  @return {void}
 */
exports.setUp = (setupCallback) => {
  httpServer.listen(testPort, setupCallback)
}

/**
 * Runs after every individual test
 *
 * Shuts down the local HTTP server
 *
 * @param  {Function} tearDownCallback Function to run when processing is complete
 * @return {void}
 */
exports.tearDown = (tearDownCallback) => {
  httpServer.close(tearDownCallback)
}

//Tests GET /
exports.testExampleRouteWorks = (test) => {
  request({
    uri: `${testUriRoot}`,
    method: 'GET',
    json: true
  }, (err, resp, body) => {
    test.equals(200, resp.statusCode)
    test.equals(body.msg, 'Hello World')
    test.done()
  })
}

//Tests that POSTing to /example without a url param returns an error
exports.testBadPostRequestIsRejected = (test) => {
  let badOptions = {}
  request({
    uri: `${testUriRoot}/example`,
    method: 'POST',
    json: true
  }, (err, resp, body) => {
    test.equals(400, resp.statusCode)
    test.equals(body.msg, 'You must supply a URL')
    test.done()
  })
}

//Tests that POSTing to /example with a url returns a 200
exports.testGoodPostRequestIsAccepted = (test) => {
  let goodOptions = {
    url: 'https://www.example.com'
  }
  request({
    uri: `${testUriRoot}/example`,
    method: 'POST',
    body: goodOptions,
    json: true
  }, (err, resp, body) => {
    test.equals(200, resp.statusCode)
    test.equals(body.msg, 'URL accepted for processing')
    test.done()
  })
}