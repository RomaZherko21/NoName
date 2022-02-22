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

  return (
    <li>
      <ListItem
        button
        component={renderLink}
        selected={location.pathname.includes(to)}
      >
        {icon && (
          <ListItemIcon style={{ color: 'inherit' }}>{icon}</ListItemIcon>
        )}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  )
}

export default ListItemLink
