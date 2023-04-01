interface AppConfigValues {
  API_URL: string
}

class AppConfig implements AppConfigValues {
  API_URL = ''

  init() {}
}

const model = new AppConfig()

export default model
