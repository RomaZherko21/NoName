import Header from './Header/Header'

interface Props {
  children: JSX.Element
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

export default Layout
