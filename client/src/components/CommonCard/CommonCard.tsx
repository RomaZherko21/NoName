import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  Typography,
} from '@mui/material'
import { red } from '@mui/material/colors'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import { format } from 'date-fns'
import { fromMsToDate } from 'helpers'
import { COMMON_DATE_FORMAT } from 'constants/dates'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

interface Props {
  name: string
  description: string
  createdAt: number
  imageUrl: string
  creatorAvatarUrl: string
}

const CommonCard = ({
  name,
  description,
  createdAt,
  imageUrl,
  creatorAvatarUrl,
}: Props) => {
  const { t } = useTranslation()

  const [anchorEl, setAnchorEl] = useState(null)

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  console.log(createdAt)
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{ cursor: 'pointer', bgcolor: red[500] }}
            src={creatorAvatarUrl}
          />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon onClick={handleMenu} />
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <List>
                <Link
                  to="/profile"
                  style={{ color: 'inherit', textDecoration: 'none' }}
                  color="black"
                >
                  <ListItem disablePadding onClick={() => handleClose()}>
                    <ListItemButton>
                      <ListItemIcon>
                        <AccountBoxIcon />
                      </ListItemIcon>
                      <ListItemText primary={t('common.profile')} />
                    </ListItemButton>
                  </ListItem>
                </Link>
              </List>
            </Menu>
          </IconButton>
        }
        title={name}
        subheader={format(fromMsToDate(createdAt), COMMON_DATE_FORMAT)}
      />
      <CardMedia
        component="img"
        height="194"
        image={imageUrl}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default CommonCard
