import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material'
import { red } from '@mui/material/colors'
import MoreVertIcon from '@mui/icons-material/MoreVert'

import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import { format } from 'date-fns'
import { fromMsToDate } from 'helpers'
import { COMMON_DATE_FORMAT } from 'constants/dates'
import { useMemo } from 'react'
import { PopupMenu } from 'components/PopupMenu'
import { getPopupConfig } from './PopupConfig'

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
  const popupConfig = useMemo(() => getPopupConfig(), [])

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
            <PopupMenu
              ActionButton={(btnProps: any) => <MoreVertIcon {...btnProps} />}
              config={popupConfig}
            />
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
