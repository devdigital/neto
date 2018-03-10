const isProduction = process.env.NODE_ENV === 'production'

class SettingsService {
  getUri() {
    return isProduction ? 'http://neto.netlify.com' : 'http://localhost:1234'
  }
}

export default new SettingsService()
