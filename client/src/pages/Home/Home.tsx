import { observer } from 'mobx-react-lite'

import Header from 'components/Layout/Header/Header'

const Home = () => {
  console.log('Home')
  return (
    <>
      <Header />
    </>
  )
}

export default observer(Home)
