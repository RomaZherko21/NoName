import { format } from 'date-fns'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import { generatePath, Link } from 'react-router-dom'
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
  Box,
  Button,
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'

import { fromMsToDate } from 'shared/helpers'
import { COMMON_DATE_FORMAT, ROUTES } from 'shared/consts'
import { PopupMenu } from 'shared/ui'

import s from './Styles.module.scss'
import { getPopupConfig } from './PopupConfig'

interface Props {
  id: number
  name: string
  description: string
  createdAt: number
  imageUrl: string
  creatorAvatarUrl: string
  likes: number
  is_liked: boolean
  toggleLike: (id: number) => void
  popupConfig: Array<{
    Icon: JSX.Element
    text: string
    linkTo?: string
    onClick?: (args?: any) => void
  }>
}

const CommonCard = ({
  id,
  name,
  description,
  createdAt,
  imageUrl,
  creatorAvatarUrl,
  popupConfig,
  likes,
  is_liked,
  toggleLike,
}: Props) => {
  const { t } = useTranslation()

  return (
    <Card sx={{ height: 380 }} key={id}>
      <CardHeader
        avatar={<Avatar sx={{ cursor: 'pointer', objectFit: 'fill' }} src={creatorAvatarUrl} />}
        action={
          <IconButton aria-label="settings">
            <PopupMenu
              id={id}
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
        height="185"
        image={imageUrl}
        sx={{ objectFit: 'fill' }}
        alt={imageUrl}
      />
      <CardContent sx={{ pb: 0.5 }}>
        <Typography className={s.ellipsis} variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box display="flex" alignItems="center">
          <Button
            onClick={() => toggleLike(id)}
            variant="outlined"
            startIcon={
              <FavoriteIcon
                sx={{
                  color: (theme) =>
                    is_liked ? theme.palette.error.dark : theme.palette.action.active,
                }}
              />
            }
          >
            {likes}
          </Button>
          <IconButton>
            <PopupMenu
              id={id}
              ActionButton={(btnProps: any) => <ShareIcon {...btnProps} />}
              config={getPopupConfig(window.location.href, t)}
            />
          </IconButton>
        </Box>
        <Box>
          <Button
            variant="text"
            component={Link}
            to={generatePath(ROUTES.POST, { id: String(id) })}
          >
            {t('post:actions.readMore')}
          </Button>
        </Box>
      </CardActions>
    </Card>
  )
}

export default observer(CommonCard)
