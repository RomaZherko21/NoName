interface AppConfigValues {
  API_URL: string
}

class AppConfig implements AppConfigValues {
  API_URL = 'http://localhost:3001/'

  init() {}
}

export default new AppConfig()
