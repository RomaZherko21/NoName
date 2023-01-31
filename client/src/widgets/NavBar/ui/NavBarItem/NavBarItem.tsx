import { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Collapse,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
} from '@mui/material'
import { AiOutlineRight, AiOutlineDown } from 'react-icons/ai'

interface Props {
  icon: JSX.Element
  title: string
  to?: string
  collapsedItems?: { to: string; text: string }[]
}

const NavBarItem = ({ icon, title, to = '', collapsedItems = [] }: Props) => {
  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()

  const [isOpen, setIsOpen] = useState(false)

  const onItemClick = () => {
    if (to) {
      navigate(to)
    } else {
      setIsOpen((pre) => !pre)
    }
  }

  const active = useMemo(
    () =>
      to ? location.pathname === to : collapsedItems.find((item) => location.pathname === item.to),
    [to, location, collapsedItems]
  )

  return (
    <>
      <ListItemButton sx={{ py: 0.6, px: 1, borderRadius: 1 }} onClick={onItemClick}>
        <ListItemIcon
          sx={{
            color: ({ palette }) => (active ? palette.primary.main : palette.text.secondary),
            fontSize: 20,
          }}
        >
          {icon}
        </ListItemIcon>

        <ListItemText>
          <Typography
            variant="body2"
            color={({ palette }) => (active ? palette.text.primary : palette.text.secondary)}
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
          {collapsedItems.map((item) => (
            <List component="div" disablePadding>
              <ListItemButton
                sx={{ p: 0.6, borderRadius: 1, pl: 5 }}
                onClick={() => {
                  navigate(item.to)
                }}
              >
                {location.pathname === item.to && (
                  <Box
                    sx={{
                      position: 'absolute',
                      width: '6px',
                      height: '6px',
                      backgroundColor: 'primary.main',
                      borderRadius: 50,
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
            </List>
          ))}
        </Collapse>
      )}
    </>
  )
}

export default NavBarItem
