import { format } from 'date-fns'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import { Link, useNavigate } from 'react-router-dom'
import {
  Avatar,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  Box,
  Chip,
  Link as MuiLink,
  Tooltip
} from '@mui/material'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

import { fromMsToDate } from 'shared/helpers'
import { COMMON_DATE_FORMAT } from 'shared/consts'

import s from './Styles.module.scss'

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
  pathTo: string
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
  likes,
  is_liked,
  toggleLike,
  pathTo,
}: Props) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <Card sx={{ height: 470 }} key={id}>
      <CardMedia
        component="img"
        height="220"
        image={imageUrl}
        sx={{ objectFit: 'fill', cursor: 'pointer' }}
        alt={imageUrl}
        onClick={() => {
          navigate(pathTo)
        }}
      />

      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb:2 }}>
          <Chip label="Programming" sx={{backgroundColor:(theme)=>theme.palette.grey[700]}} />
          <Typography variant="body2" color="text.secondary" >
            5 min read
          </Typography>
        </Box>

        <MuiLink component={Link} to={pathTo} variant="h5" color="text.primary" underline="hover" >
          {name}
        </MuiLink>
        <Typography className={s.ellipsis} variant="body1" color="text.secondary" mt={1}>
          {description}
        </Typography>

        <Box sx={{ mt:2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ cursor: 'pointer', objectFit: 'fill' }} src={creatorAvatarUrl} />
            <Typography variant="subtitle2" sx={{color:"text.primary", ml:2, display: 'flex', alignItems:'center'}}>
              By
              <Box
                sx={{
                  width: '6px',
                  height: '6px',
                  backgroundColor: 'text.primary',
                  borderRadius: 50,
                  m: 1
                }}
              />
              {format(fromMsToDate(createdAt), COMMON_DATE_FORMAT)} 
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
            <Tooltip
              title={is_liked ? t('actions.unlike') : t('actions.like')}
              placement="bottom"
            >
              <IconButton
                onClick={() => toggleLike(id)}
                sx={{
                  color: (theme) =>
                    is_liked ? theme.palette.error.dark : theme.palette.action.active,
                  fontSize: 22,
                  p: 0,
                }}
              >
                {is_liked ? <AiFillHeart /> : <AiOutlineHeart />}
              </IconButton>
            </Tooltip>

            <Typography variant="body2" color="text.secondary">
              {likes}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default observer(CommonCard)
