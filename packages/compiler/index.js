'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./src/index')
} else {
  module.exports = require('./src/index')
}