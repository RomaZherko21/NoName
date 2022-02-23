import { observer } from 'mobx-react-lite'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import ListIcon from '@mui/icons-material/List'
import { IconButton } from '@mui/material'

interface Props {
  className?: string
  toggleMenu: () => void
}

const Header = ({ className, toggleMenu }: Props) => {
  return (
    <AppBar position="static" className={className}>
      <Toolbar disableGutters sx={{ flexGrow: 1, padding: '0 15px' }}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleMenu}
        >
          <ListIcon />
        </IconButton>
        <Typography sx={{ flexGrow: 1 }} variant="h6">
          No Name
        </Typography>

        <Box>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
        </Box>
      </Toolbar>
    </AppBar>
  )
}
export default observer(Header)
