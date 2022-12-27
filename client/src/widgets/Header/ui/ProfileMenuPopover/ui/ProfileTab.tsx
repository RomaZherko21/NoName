import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import GroupsIcon from '@mui/icons-material/Groups'
import LogoutIcon from '@mui/icons-material/Logout'

import { ROUTES } from 'shared/consts'

interface Props {
  onLogout: () => void
  onMenuClose: (event: any) => void
}

function ProfileTab({ onLogout, onMenuClose }: Props) {
  const navigate = useNavigate()

  const onChangePage = (route: string, event: any) => {
    navigate(route)
    onMenuClose(event)
  }

  return (
    <List>
      <ListItemButton onClick={(event) => onChangePage(ROUTES.PROFILE_TIMELINE, event)}>
        <ListItemIcon>
          <AccountCircleIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="View Profile" />
      </ListItemButton>

      <ListItemButton onClick={(event) => onChangePage(ROUTES.ACCOUNT_GENERAL, event)}>
        <ListItemIcon>
          <BorderColorIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Edit Profile" />
      </ListItemButton>

      <ListItemButton>
        <ListItemIcon>
          <GroupsIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Social Profile" />
      </ListItemButton>

      <ListItemButton onClick={onLogout}>
        <ListItemIcon>
          <LogoutIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </List>
  )
}

export default observer(ProfileTab)
