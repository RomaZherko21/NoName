import { Container, Typography } from '@mui/material'

import { useBoolState } from 'hooks'
import { useLocation } from 'react-router-dom'

import Aside from './Aside'
import Header from './Header/Header'
import styles from './Layout.module.sass'

interface Props {
  children: JSX.Element
}

const Layout = ({ children }: Props) => {
  const [isOpenMenu, , , toggleMenu] = useBoolState(false)
  const location = useLocation()

  return (
    <div className={styles.root}>
      <Header className={styles.header} toggleMenu={toggleMenu} />

      <Aside className={styles.aside} isOpen={isOpenMenu} />

      <Container className={styles.content}>
        <Typography variant="h5" sx={{ paddingBottom: '20px' }}>
          {location.pathname.substring(1)}
        </Typography>
        {children}
      </Container>
    </div>
  )
}

export default Layout
