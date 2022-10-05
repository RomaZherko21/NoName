interface AppConfigValues {
  NODE_API_URL: string
}

class AppConfig implements AppConfigValues {
  NODE_API_URL = ''

  init() {}
}

export default new AppConfig()
