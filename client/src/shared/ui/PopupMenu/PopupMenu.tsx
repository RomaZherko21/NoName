import { ReactNode, useState } from 'react'
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu } from '@mui/material'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

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
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <List>
          {config.map((item) =>
            item.linkTo ? (
              <Link
                to={item.linkTo}
                style={{ color: 'inherit', textDecoration: 'none' }}
                color="black"
              >
                <ListItem disablePadding onClick={() => handleClose()}>
                  <ListItemButton>
                    <ListItemIcon>{item.Icon}</ListItemIcon>
                    <ListItemText primary={t(item.text)} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ) : (
              <ListItem
                disablePadding
                onClick={() => {
                  item.onClick?.(id)
                  handleClose()
                }}
              >
                <ListItemButton>
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
