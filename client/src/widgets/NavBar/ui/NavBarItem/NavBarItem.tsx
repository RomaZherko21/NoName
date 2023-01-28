import { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  Collapse,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import { AiOutlineRight, AiOutlineDown } from 'react-icons/ai'

interface Props {
  icon: JSX.Element
  title: string
  to?: string
  collapsedItems?: { to: string; text: string }[]
}

const NavBarItem = ({ icon, title, to = '', collapsedItems = [] }: Props) => {
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
        <ListItemText
          sx={{
            color: ({ palette }) => (active ? palette.text.primary : palette.text.secondary),
            fontSize: ({ typography }) => typography.body1.fontSize,
          }}
        >
          {title}
        </ListItemText>
        {!to && (
          <IconButton sx={{ color: ({ palette }) => palette.grey[600], fontSize: 12 }}>
            {isOpen ? <AiOutlineDown /> : <AiOutlineRight />}
          </IconButton>
        )}
      </ListItemButton>

      {!to && (
        <Collapse in={isOpen} sx={{ mt: 0 }} timeout="auto" unmountOnExit>
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
                  ></Box>
                )}
                <Typography
                  variant="body2"
                  color={location.pathname === item.to ? 'text.primary' : 'text.secondary'}
                >
                  {item.text}
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
