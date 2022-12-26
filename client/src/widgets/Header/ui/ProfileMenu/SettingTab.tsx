import { useNavigate } from 'react-router-dom'
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import HelpIcon from '@mui/icons-material/Help'
import HttpsIcon from '@mui/icons-material/Https'
import FeedbackIcon from '@mui/icons-material/Feedback'
import HistoryIcon from '@mui/icons-material/History'

import { ROUTES } from 'shared/consts'

interface Props {
  onMenuClose: (event: any) => void
}

const SettingTab = ({ onMenuClose }: Props) => {
  const navigate = useNavigate()

  const onChangePage = (route: string, event: any) => {
    navigate(route)
    onMenuClose(event)
  }

  return (
    <List>
      <ListItemButton onClick={(event) => onChangePage(ROUTES.ACCOUNT_GENERAL, event)}>
        <ListItemIcon>
          <HelpIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Support" />
      </ListItemButton>

      <ListItemButton>
        <ListItemIcon>
          <HttpsIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Privacy Center" />
      </ListItemButton>

      <ListItemButton>
        <ListItemIcon>
          <FeedbackIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Feedback" />
      </ListItemButton>

      <ListItemButton>
        <ListItemIcon>
          <HistoryIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="History" />
      </ListItemButton>
    </List>
  )
}

export default SettingTab
