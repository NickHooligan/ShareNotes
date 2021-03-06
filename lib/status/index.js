'use strict'

const realtime = require('../realtime/realtime')
const config = require('../config')

exports.getStatus = async (req, res) => {
  res.set({
    'Cache-Control': 'private', // only cache by client
    'Content-Type': 'application/json'
  })

  try {
    const data = await realtime.getStatus()
    res.send(data)
  } catch (e) {
    console.error(e)
    res.status(500).send(e.toString())
  }
}

exports.getMetrics = async (req, res) => {
  const data = await realtime.getStatus()

  res.set({
    'Cache-Control': 'private', // only cache by client
    'Content-Type': 'text/plain; charset=utf-8'
  })
  res.render('../js/lib/common/metrics.ejs', data)
}

exports.getConfig = (req, res) => {
  const data = {
    domain: config.domain,
    urlpath: config.urlPath,
    debug: config.debug,
    allowedUploadMimeTypes: config.allowedUploadMimeTypes,
    defaultUseHardbreak: config.defaultUseHardbreak,
    linkifyHeaderStyle: config.linkifyHeaderStyle,
    useCDN: config.useCDN,
    defaultTocDepth: config.defaultTocDepth
  }
  res.set({
    'Cache-Control': 'private', // only cache by client
    'Content-Type': 'application/javascript'
  })
  res.render('../js/lib/common/constant.ejs', data)
}
