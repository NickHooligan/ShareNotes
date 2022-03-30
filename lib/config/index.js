'use strict'

const crypto = require('crypto')
const path = require('path')
const {
  merge
} = require('lodash')
const deepFreeze = require('deep-freeze')
const logger = require('../logger')

const appRootPath = path.resolve(__dirname, '../../')
const env = "development"
const debugConfig = {
  debug: true,
}

let config = require('./default')
merge(config, debugConfig)

if (['debug', 'verbose', 'info', 'warn', 'error'].includes(config.loglevel)) {
  logger.level = config.loglevel
} else {
  logger.error('Selected loglevel %s doesn\'t.', config.loglevel)
}

// Permission
config.permission = {
  freely: 'freely',
  editable: 'editable',
  limited: 'limited',
  locked: 'locked',
  protected: 'protected',
  private: 'private'
}
let defaultPermission = config.permission.editable
if (!config.allowAnonymous && !config.allowAnonymousViews) {
  delete config.permission.freely
  delete config.permission.editable
  delete config.permission.locked
  defaultPermission = config.permission.limited
} else if (!config.allowAnonymous && !config.allowAnonymousEdits) {
  delete config.permission.freely
}
if (!(config.defaultPermission in config.permission)) {
  config.defaultPermission = defaultPermission
}

// cache serverURL
config.serverURL = (function getserverurl() {
  var url = 'http://' + config.domain
  if (config.port !== 80) url += ":" + config.port
  if (config.urlPath) url += "/" + config.urlPath
  logger.info("Server url " + url)
  return url
})()

config.Environment = "development"

config.isEmailEnable = config.email
config.isPDFExportEnable = config.allowPDFExport

// Generate session secret if it stays on default values
if (config.sessionSecret === 'secret') {
  logger.warn('Session secret not set. Using random generated one.All users will be logged out.')
  config.sessionSecret = crypto.randomBytes(Math.ceil(config.sessionSecretLen / 2)) // generate crypto graphic random number
    .toString('hex') // convert to hexadecimal format
    .slice(0, config.sessionSecretLen) // return required number of characters
}

// Validate upload upload providers
if (config.imageUploadType.toLowerCase() !== "filesystem") {
  config.imageUploadType = 'filesystem'
}

// figure out mime types for image uploads
config.allowedUploadMimeTypes = [
  'image/jpeg',
  'image/png',
  'image/jpg',
  'image/gif',
  'image/svg+xml',
  'image/bmp',
  'image/tiff'
];

config.appRootPath = appRootPath
config.viewPath = path.resolve(appRootPath, config.viewPath)
config.tmpPath = path.resolve(appRootPath, config.tmpPath)
config.defaultNotePath = path.resolve(appRootPath, config.defaultNotePath)
config.docsPath = path.resolve(appRootPath, config.docsPath)
config.uploadsPath = path.resolve(appRootPath, config.uploadsPath)

// make config readonly
config = deepFreeze(config)

module.exports = config
