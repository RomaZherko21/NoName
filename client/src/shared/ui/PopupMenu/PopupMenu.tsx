import { ReactNode, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  Typography,
} from '@mui/material'

interface Props {
  config: Array<{
    Icon: JSX.Element
    text: string
    linkTo?: string
    onClick?: (args?: any) => void
    key?: string
  }>
  ActionButton: (args: any) => ReactNode
  id?: number
  post_id?: number
  selectCondition?: string
}

const PopupMenu = ({ config, ActionButton, id, selectCondition }: Props) => {
  const { t } = useTranslation()

  const [anchorEl, setAnchorEl] = useState(null)

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      {ActionButton({ onClick: handleMenu })}
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        disableScrollLock
      >
        <List sx={{ minWidth: '200px', p: 0 }}>
          {config.map((item) =>
            item.linkTo ? (
              <Link
                to={item.linkTo}
                style={{ color: 'inherit', textDecoration: 'none' }}
                key={item.linkTo}
              >
                <ListItem disablePadding>
                  <ListItemButton sx={{ px: 1, py: 0.5 }} onClick={() => handleClose()}>
                    <ListItemIcon>{item.Icon}</ListItemIcon>
                    <ListItemText primary={t(item.text)} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ) : (
              <ListItem disablePadding key={item.text}>
                <ListItemButton
                  onClick={() => {
                    item.onClick?.(id)
                    handleClose()
                  }}
                  sx={{ px: 1, py: 0.5 }}
                >
                  <ListItemIcon>{item.Icon}</ListItemIcon>
                  <ListItemText>
                    <Typography
                      variant="body2"
                      color={selectCondition === item.key ? 'text.primary' : 'text.secondary'}
                    >
                      {t(item.text)}
                    </Typography>
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            )
          )}
        </List>
      </Menu>
    </>
  )
}

export default PopupMenu
