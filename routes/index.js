var express = require('express');
var router = express.Router();

/**
 * Example route that returns 'Hello World'
 *
 * @param  {Object} req Express request object
 * @param  {Object} res Express response object
 */
router.get('/', (req, res) => {
  return res.json({ success: true, msg: 'Hello World' })
})

/**
 * Example route that accepts a POST with a body containing a url for processing
 *
 * @param  {Object} req Express request object
 * @param  {Object} res Express response object
 */
router.post('/example', (req, res) => {
  if (!req.body.url) {
    return res.status(400).json({ success: false, msg: 'You must supply a URL' })
  }
  return res.json({ success: true, msg: 'URL accepted for processing' })
})

module.exports = router;
