import { forwardRef, useMemo } from 'react'
import { NavLink, NavLinkProps, useLocation } from 'react-router-dom'
import { IconButton, ListItem, ListItemIcon, ListItemText } from '@mui/material'

interface Props {
  icon: JSX.Element
  title: string
  to: string
}

const NavBarItem = ({ icon, title, to }: Props) => {
  const location = useLocation()

  const renderLink = useMemo(
    () =>
      forwardRef<any, Omit<NavLinkProps, 'to'>>((itemProps, ref) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <NavLink to={to} ref={ref} {...itemProps} />
      )),
    [to]
  )

  const active = location.pathname.includes(to)

  return (
    <ListItem
      sx={{ backgroundColor: active ? 'action.focus' : 'inherit', p: 0.6, borderRadius: 1 }}
      button
      component={renderLink}
    >
      {icon && (
        <ListItemIcon sx={{ color: active ? 'secondary.main' : 'inherit' }}>
          <IconButton sx={{ color: (theme) => theme.palette.grey[500], fontSize: '20px' }}>
            {icon}
          </IconButton>
        </ListItemIcon>
      )}
      <ListItemText sx={{ color: active ? 'secondary.main' : 'inherit' }} primary={title} />
    </ListItem>
  )
}

export default NavBarItem
