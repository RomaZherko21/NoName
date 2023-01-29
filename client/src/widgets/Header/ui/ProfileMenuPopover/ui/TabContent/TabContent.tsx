import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import { useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'

interface Props {
  getConfig: (value: any) => {
    icon: JSX.Element
    text: string
    to?: string
    onClick?: () => void
  }[]
  onMenuClose: (event: any) => void
  onLogout?: () => void
}

function TabContent({ onLogout, onMenuClose, getConfig }: Props) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()

  const tabsConfig = useMemo(() => getConfig({ onLogout }), [onLogout, getConfig])

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
          <ListItemIcon
            sx={{
              color: ({ palette }) =>
                location.pathname === item.to ? palette.primary.main : palette.text.secondary,
              fontSize: 20,
            }}
          >
            {item.icon}
          </ListItemIcon>
          <ListItemText>
            <Typography
              variant="body2"
              color={({ palette }) =>
                location.pathname === item.to ? palette.text.primary : palette.text.secondary
              }
            >
              {t(item.text)}
            </Typography>
          </ListItemText>
        </ListItemButton>
      ))}
    </List>
  )
}

export default observer(TabContent)