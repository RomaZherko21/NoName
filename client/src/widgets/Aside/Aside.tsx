import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import AddBoxIcon from '@mui/icons-material/AddBox'
import { Badge, Drawer, List } from '@mui/material'
import GroupIcon from '@mui/icons-material/Group'
import NewspaperIcon from '@mui/icons-material/Newspaper'
import MenuBookIcon from '@mui/icons-material/MenuBook'

import AsideItemLink from './AsideItemLink'
import styles from './Aside.module.sass'

interface AsideProps {
  className?: string
  isOpen: boolean
}

const Aside = ({ className, isOpen }: AsideProps) => {
  const { t } = useTranslation()

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
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.900',
          color: '#FFFFFF',
        },
      }}
      color="secondary"
      style={{ backgroundColor: 'black' }}
      open={isOpen}
    >
      <List>
        <AsideItemLink icon={<GroupIcon />} title={t('page:users')} to="/users" isOpen={isOpen} />

        <AsideItemLink
          icon={<MenuBookIcon />}
          title={t('page:books')}
          to="/books"
          isOpen={isOpen}
        />

        <AsideItemLink
          icon={<NewspaperIcon />}
          title={t('page:posts')}
          to="/posts"
          isOpen={isOpen}
        />

        <AsideItemLink
          icon={
            <Badge badgeContent={10} color="secondary" max={999}>
              <AddBoxIcon />
            </Badge>
          }
          title={t('page:reports')}
          to="/ewq"
          isOpen={isOpen}
        />
      </List>
    </Drawer>
  )
}

export default observer(Aside)
