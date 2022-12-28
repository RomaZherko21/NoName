import ReactDOM from 'react-dom'

import App from './app/App'
import initTranslation from './i18n'

async function init() {
  await initTranslation()
  ReactDOM.render(<App />, document.getElementById('root'))
}

init()
