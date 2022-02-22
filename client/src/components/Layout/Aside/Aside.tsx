import clsx from 'clsx'
import { observer } from 'mobx-react-lite'
import AddBoxIcon from '@mui/icons-material/AddBox'
import { Badge, Drawer, List } from '@mui/material'
import GroupIcon from '@mui/icons-material/Group'

import AsideItemLink from './AsideItemLink'
import styles from './Aside.module.sass'

interface AsideProps {
  className?: string
  isOpen: boolean
}

const Aside = ({ className, isOpen }: AsideProps) => {
  return (
    <Drawer
      variant="permanent"
      className={clsx(className, styles.drawer, {
        [styles.drawerOpen]: isOpen,
        [styles.drawerClose]: !isOpen,
      })}
      classes={{
        paper: clsx(styles.paper, styles.drawer, {
          [styles.drawerOpen]: isOpen,
          [styles.drawerClose]: !isOpen,
        }),
      }}
      open={isOpen}
    >
      <List>
        <AsideItemLink
          icon={<GroupIcon />}
          title="Список пользователей"
          to="/usersList"
          isOpen={isOpen}
        />

        <AsideItemLink
          icon={<AddBoxIcon />}
          title="Загрузить документ"
          to="/qwe"
          isOpen={isOpen}
        />

        <AsideItemLink
          icon={
            <Badge badgeContent={10} color="secondary" max={999}>
              <AddBoxIcon />
            </Badge>
          }
          title="Документы"
          to="/ewq"
          isOpen={isOpen}
        />

        <AsideItemLink
          icon={<AddBoxIcon />}
          title="Отчеты"
          to="/www"
          isOpen={isOpen}
        />
      </List>
    </Drawer>
  )
}

export default observer(Aside)
