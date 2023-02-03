import { format } from 'date-fns'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import { generatePath, Link, useNavigate } from 'react-router-dom'
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
  Tooltip,
} from '@mui/material'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

import { fromMsToDate } from 'shared/helpers'
import {
  COMMON_DATE_FORMAT,
  NODE_API_POST_IMAGES_URL,
  NODE_API_USER_AVATAR_URL,
  ROUTES,
} from 'shared/consts'

import s from './Styles.module.scss'
import { Post } from 'shared/types'

interface Props {
  post: Post
  toggleLike: (id: number) => void
}

const PostCard = ({ post, toggleLike }: Props) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <Card sx={{ height: 470 }} key={post.id}>
      <CardMedia
        component="img"
        height="220"
        image={`${NODE_API_POST_IMAGES_URL}/${post.image}`}
        sx={{ objectFit: 'fill', cursor: 'pointer' }}
        alt={post.name}
        onClick={() => {
          navigate(generatePath(ROUTES.POST, { id: String(post.id) }))
        }}
      />

      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Chip
            label={t(`post:genre.${post.genre}`)}
            sx={{ backgroundColor: (theme) => theme.palette.grey[700] }}
          />
          <Typography variant="body2" color="text.secondary">
            {t('post:readingTime', { minute: post.reading_time })}
          </Typography>
        </Box>

        <MuiLink
          component={Link}
          to={generatePath(ROUTES.POST, { id: String(post.id) })}
          variant="h5"
          color="text.primary"
          underline="hover"
        >
          {post.name}
        </MuiLink>

        <Typography className={s.ellipsis} variant="body1" color="text.secondary" mt={1}>
          {post.description}
        </Typography>

        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              sx={{ cursor: 'pointer', objectFit: 'fill' }}
              src={`${NODE_API_USER_AVATAR_URL}/${post.avatar}`}
            />
            <Typography
              variant="subtitle2"
              sx={{ color: 'text.primary', ml: 2, display: 'flex', alignItems: 'center' }}
            >
              By
              <Box
                sx={{
                  width: '6px',
                  height: '6px',
                  backgroundColor: 'text.primary',
                  borderRadius: 50,
                  m: 1,
                }}
              />
              {format(fromMsToDate(post.created_at), COMMON_DATE_FORMAT)}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
            <Tooltip
              title={post.is_liked ? t('actions.unlike') : t('actions.like')}
              placement="bottom"
            >
              <IconButton
                onClick={() => toggleLike(post.id)}
                sx={{
                  color: (theme) =>
                    post.is_liked ? theme.palette.error.dark : theme.palette.action.active,
                  fontSize: 22,
                  p: 0,
                }}
              >
                {post.is_liked ? <AiFillHeart /> : <AiOutlineHeart />}
              </IconButton>
            </Tooltip>

            <Typography variant="body2" color="text.secondary">
              {post.likes_count}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default observer(PostCard)
