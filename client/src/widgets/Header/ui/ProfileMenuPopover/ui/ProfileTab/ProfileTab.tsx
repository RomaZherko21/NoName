import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'

import { getConfig } from './config'

interface Props {
  onLogout: () => void
  onMenuClose: (event: any) => void
}

function ProfileTab({ onLogout, onMenuClose }: Props) {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const tabsConfig = useMemo(() => getConfig({ onLogout }), [onLogout])

  const onChangePage = (route: string, event: any) => {
    navigate(route)
    onMenuClose(event)
  }

  return (
    <List sx={{ p: 0 }}>
      {tabsConfig.map((item) => (
        <ListItemButton
          onClick={(event) => {
            if (item.to) {
              onChangePage(item.to, event)
            } else if (item.onClick) {
              item.onClick()
            }
          }}
        >
          <ListItemIcon sx={{ fontSize: 20 }}>{item.icon}</ListItemIcon>
          <ListItemText primary={t(item.text)} />
        </ListItemButton>
      ))}
    </List>
  )
}

export default observer(ProfileTab)
