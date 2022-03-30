'use strict'

const os = require('os');

const host = '127.0.0.1';

module.exports = {
  domain: host,
  host: host,
  urlPath: '',
  port: 3000,
  loglevel: 'info',
  allowOrigin: ['localhost', host],
  useCDN: false,
  allowAnonymous: false,
  allowAnonymousEdits: true,
  allowAnonymousViews: true,
  allowFreeURL: false,
  forbiddenNoteIDs: ['favicon.ico ', 'api '],
  defaultPermission: 'editable',
  dbURL: '',
  db: {
    "dialect": "sqlite",
    "storage": "./db.sharenotes.sqlite"
  },
  // public files path
  viewPath: './public/views',
  tmpPath: os.tmpdir(),
  defaultNotePath: './public/default.md',
  docsPath: './public/docs',
  uploadsPath: './public/uploads',
  // session
  sessionName: 'connect.sid',
  sessionSecret: 'this is a session secret',
  sessionSecretLen: 128,
  sessionLife: 14 * 24 * 60 * 60 * 1000, // 14 days
  staticCacheTime: 1 * 24 * 60 * 60 * 1000, // 1 day
  // socket.io
  heartbeatInterval: 5000,
  heartbeatTimeout: 10000,
  // toobusy-js
  responseMaxLag: 70,
  // document
  documentMaxLength: 100000,
  // image upload setting
  imageUploadType: 'filesystem',
  // authentication
  email: true,
  allowEmailRegister: true,
  allowGravatar: true,
  allowPDFExport: true,
  defaultUseHardbreak: true,
  // linkifyHeaderStyle - How is a header text converted into a link id.
  linkifyHeaderStyle: 'gfm',
  autoVersionCheck: true,
  defaultTocDepth: 3
}
