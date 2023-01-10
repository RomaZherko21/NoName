import { ReactNode, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu } from '@mui/material'

interface Props {
  config: Array<{
    Icon: JSX.Element
    text: string
    linkTo?: string
    onClick?: (args?: any) => void
  }>
  ActionButton: (args: any) => ReactNode
  id?: number
}

const PopupMenu = ({ config, ActionButton, id }: Props) => {
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
        <List style={{ minWidth: '200px', padding: 0 }}>
          {config.map((item) =>
            item.linkTo ? (
              <Link
                to={item.linkTo}
                style={{ color: 'inherit', textDecoration: 'none' }}
                color="black"
                key={item.linkTo}
              >
                <ListItem disablePadding>
                  <ListItemButton style={{ padding: '2px 8px' }} onClick={() => handleClose()}>
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
                  style={{ padding: '2px 8px' }}
                >
                  <ListItemIcon>{item.Icon}</ListItemIcon>
                  <ListItemText primary={t(item.text)} />
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
