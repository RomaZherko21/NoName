import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import AddBoxIcon from '@mui/icons-material/AddBox'
import { Badge, Box, Drawer, List } from '@mui/material'
import GroupIcon from '@mui/icons-material/Group'
import NewspaperIcon from '@mui/icons-material/Newspaper'

import { DRAWER_WIDTH, ROUTES } from 'shared/consts'

import AsideItemLink from './AsideItemLink'

const Aside = () => {
  const { t } = useTranslation()

  return (
    <Box
      component="nav"
      sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      <Drawer
        variant="permanent"
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: DRAWER_WIDTH,
            backgroundColor: 'background.rare',
          },
        }}
        open
      >
        <List sx={{ '& .MuiListItemIcon-root': { minWidth: 52 } }}>
          <AsideItemLink icon={<GroupIcon />} title={t('page:users')} to={ROUTES.USERS} />

          <AsideItemLink icon={<NewspaperIcon />} title={t('page:posts')} to={ROUTES.POSTS} />

          <AsideItemLink
            icon={
              <Badge badgeContent={10} color="secondary" max={999}>
                <AddBoxIcon />
              </Badge>
            }
            title={t('page:reports')}
            to={ROUTES.NOT_FOUND}
          />
        </List>
      </Drawer>
    </Box>
  )
}

export default observer(Aside)
