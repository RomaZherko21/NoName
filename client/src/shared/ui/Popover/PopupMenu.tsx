import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material'

import Popover from './Popover'

interface Props {
  config: Array<{
    Icon?: JSX.Element
    text: string
    linkTo?: string
    onClick?: (args?: any) => void
    key?: string
  }>
  ActionButton: (args: any) => JSX.Element
  id?: number
  selectCondition?: string
  sx?: any
}

const PopupMenu = ({
  config,
  ActionButton,
  id,
  selectCondition,
}: Props) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <>
      <Popover
        activateElement={(_, handleOpen) => ActionButton({ onClick: handleOpen })}
        selfClosed
      >
        <List sx={{ minWidth: 200, p: 0 }}>
          {config.map((item) => (
            <ListItem disablePadding key={item.text}>
              <ListItemButton
                onClick={() => {
                  if (item.linkTo) {
                    navigate(item.linkTo)
                  } else {
                    item.onClick?.(id)
                  }
                }}
                sx={{ px: 1, py: 0.5 }}
              >
                {item.Icon && <ListItemIcon sx={{ fontSize: 20 }}>{item.Icon}</ListItemIcon>}
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
          ))}
        </List>
      </Popover>
    </>
  )
}

export default observer(PopupMenu)
