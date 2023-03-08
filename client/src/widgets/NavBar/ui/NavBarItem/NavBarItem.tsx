import { useMemo, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Collapse,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material'
import { AiOutlineRight, AiOutlineDown } from 'react-icons/ai'

import { useRootStore } from 'stores'
import { CircleDevider } from 'shared/ui'
import { AccessRoute, Operation } from 'models/Permissions'

interface Props {
  icon: JSX.Element
  title: string
  to?: string
  collapsedItems?: { to: string; text: string; accessOperation?: Operation }[]
  accessRoute?: AccessRoute
  accessOperation?: Operation
}

const NavBarItem = ({
  icon,
  title,
  to = '',
  collapsedItems = [],
  accessRoute,
  accessOperation,
}: Props) => {
  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const { user } = useRootStore()

  const hasAccess =
    !accessRoute || !accessOperation
      ? true
      : user.permissions.hasAccess(accessOperation, accessRoute)

  const [isOpen, setIsOpen] = useState(false)

  const onItemClick = () => {
    if (to) {
      navigate(to)
    } else {
      setIsOpen((pre) => !pre)
    }
  }

  const isActive = useMemo(
    () =>
      to ? location.pathname === to : collapsedItems.find((item) => location.pathname === item.to),
    [to, location, collapsedItems]
  )

  if (!hasAccess) {
    return null
  }

  return (
    <>
      <ListItemButton sx={{ py: 0.6, px: 1, borderRadius: 1 }} onClick={onItemClick}>
        <ListItemIcon
          sx={{
            color: ({ palette }) => (isActive ? palette.primary.main : palette.text.secondary),
            fontSize: 20,
          }}
        >
          {icon}
        </ListItemIcon>

        <ListItemText>
          <Typography
            variant="body2"
            color={({ palette }) => (isActive ? palette.text.primary : palette.text.secondary)}
          >
            {t(title)}
          </Typography>
        </ListItemText>

        {!to && (
          <IconButton sx={{ color: ({ palette }) => palette.grey[600], fontSize: 12 }}>
            {isOpen ? <AiOutlineDown /> : <AiOutlineRight />}
          </IconButton>
        )}
      </ListItemButton>

      {!to && (
        <Collapse in={isOpen} timeout="auto" mountOnEnter unmountOnExit>
          <List component="div" disablePadding>
            {collapsedItems.map((item) => {
              if (
                item.accessOperation &&
                accessRoute &&
                !user.permissions.hasAccess(item.accessOperation, accessRoute)
              ) {
                return null
              }

              return (
                <ListItemButton
                  component={Link}
                  to={item.to}
                  sx={{ p: 0.6, borderRadius: 1, pl: 5 }}
                  key={item.to}
                >
                  {location.pathname === item.to && (
                    <CircleDevider
                      sx={{
                        position: 'absolute',
                        backgroundColor: 'primary.main',
                        left: 10,
                      }}
                    />
                  )}

                  <Typography
                    variant="body2"
                    color={location.pathname === item.to ? 'text.primary' : 'text.secondary'}
                  >
                    {t(item.text)}
                  </Typography>
                </ListItemButton>
              )
            })}
          </List>
        </Collapse>
      )}
    </>
  )
}

export default observer(NavBarItem)
