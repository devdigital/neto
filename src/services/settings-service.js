let settings = null

if (process.env.REMOTE_ENV) {
  settings = require('../settings.prod.js')
} else {
  settings = require('../settings.dev.js')
}

class SettingsService {
  getUri() {
    return settings.uri
  }
}

export default new SettingsService()
