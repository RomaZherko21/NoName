import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import { useLocation, useNavigate } from 'react-router-dom'
import { List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'

interface Props {
  config: {
    icon: JSX.Element
    text: string
    to?: string
    onClick?: () => void
  }[]
  onMenuClose: (e: any) => void
}

function TabContent({ onMenuClose, config }: Props) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()

  const onChangePage = (route: string, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    navigate(route)
    onMenuClose(e)
  }

  return (
    <List sx={{ p: 0 }}>
      {config.map((item) => (
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
