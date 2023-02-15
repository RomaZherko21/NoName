import ReactDOM from 'react-dom'

import { App, initTranslation } from './app'

async function init() {
  await initTranslation()
  ReactDOM.render(<App />, document.getElementById('root'))
}

init()
