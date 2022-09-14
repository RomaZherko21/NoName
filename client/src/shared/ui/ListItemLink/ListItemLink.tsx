import { ListItem, ListItemIcon, ListItemText } from '@mui/material'
import { forwardRef, ReactElement, useMemo } from 'react'
import { NavLink, NavLinkProps, useLocation } from 'react-router-dom'

interface ListItemLinkProps {
  icon?: ReactElement
  primary: string
  to: string
}

const ListItemLink = ({ icon, primary, to }: ListItemLinkProps) => {
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
    <li>
      <ListItem
        sx={{ backgroundColor: active ? 'action.focus' : 'inherit' }}
        button
        component={renderLink}
      >
        {icon && (
          <ListItemIcon sx={{ color: active ? 'secondary.main' : 'inherit' }}>{icon}</ListItemIcon>
        )}
        <ListItemText sx={{ color: active ? 'secondary.main' : 'inherit' }} primary={primary} />
      </ListItem>
    </li>
  )
}

export default ListItemLink
