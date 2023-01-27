interface AppConfigValues {
  API_URL: string
}

class AppConfig implements AppConfigValues {
  API_URL = ''

  init() {}
}

export default new AppConfig()
