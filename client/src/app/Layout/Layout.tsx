import { observer } from 'mobx-react-lite'

import { Aside, Header } from 'widgets'
import { useBoolState } from 'shared/hooks'

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

      <div className={styles.content}>{children}</div>
    </div>
  )
}

export default observer(Layout)
