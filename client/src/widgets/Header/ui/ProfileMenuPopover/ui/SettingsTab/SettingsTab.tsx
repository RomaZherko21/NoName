import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'

import { getConfig } from './config'

interface Props {
  onMenuClose: (event: any) => void
}

function SettingsTab({ onMenuClose }: Props) {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const tabsConfig = useMemo(() => getConfig(), [])

  const onChangePage = (route: string, event: any) => {
    navigate(route)
    onMenuClose(event)
  }

  return (
    <List sx={{ p: 0 }}>
      {tabsConfig.map((item) => (
        <ListItemButton
          onClick={(event) => {
            onChangePage(item.to, event)
          }}
        >
          <ListItemIcon sx={{ fontSize: 20 }}>{item.icon}</ListItemIcon>
          <ListItemText primary={t(item.text)} />
        </ListItemButton>
      ))}
    </List>
  )
}

export default observer(SettingsTab)
