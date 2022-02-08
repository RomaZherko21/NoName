import Header from './Header/Header'

interface Props {
  children: JSX.Element
}

const Layout = ({ children }: Props) => {
  console.log('hehe')
  return (
    <>
      <Header />
      {children}
    </>
  )
}

export default Layout
