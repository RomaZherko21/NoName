import { Container } from '@mui/material'

import { useBoolState } from 'hooks'

import Aside from './Aside'
import Header from './Header/Header'
import styles from './Layout.module.sass'

interface Props {
  children: JSX.Element
}

const Layout = ({ children }: Props) => {
  const [isOpenMenu, , , toggleMenu] = useBoolState(false)

  return (
    <div className={styles.root}>
      <Header className={styles.header} toggleMenu={toggleMenu} />

      <Aside className={styles.aside} isOpen={isOpenMenu} />

      <Container className={styles.content}>{children}</Container>
    </div>
  )
}

export default Layout
