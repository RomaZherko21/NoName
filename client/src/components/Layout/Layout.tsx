import { Container } from '@mui/material'
import Header from './Header/Header'

interface Props {
  children: JSX.Element
}

const Layout = ({ children }: Props) => {
  return (
    <Container disableGutters style={{ background: 'black', height: '100vh' }}>
      <Header />
      {children}
    </Container>
  )
}

export default Layout
