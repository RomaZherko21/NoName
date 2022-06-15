import { ReactNode, useState } from 'react'
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
} from '@mui/material'
import { Link } from 'react-router-dom'

interface Props {
  config: Array<{
    Icon: JSX.Element
    text: string
    linkTo?: string
    onClick?: (args?: any) => void
  }>
  ActionButton: (args: any) => ReactNode
}

const PopupMenu = ({ config, ActionButton }: Props) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  console.log(config)

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
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ) : (
              <ListItem
                disablePadding
                onClick={() => {
                  item.onClick?.()
                  handleClose()
                }}
              >
                <ListItemButton>
                  <ListItemIcon>{item.Icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
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
