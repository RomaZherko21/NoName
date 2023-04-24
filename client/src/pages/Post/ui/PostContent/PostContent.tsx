import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import parse from 'html-react-parser'
import { generatePath, useNavigate } from 'react-router-dom'
import { Box, Typography, IconButton, Tooltip, Chip } from '@mui/material'
import { AiOutlineHeart, AiFillHeart, AiOutlineShareAlt } from 'react-icons/ai'

import { CircleDevider, InformativeImage, PopupMenu } from 'shared/ui'
import { API_POST_IMAGES_URL, API_USER_AVATAR_URL, ROUTES } from 'shared/consts'
import { fromTimestampToDate } from 'shared/helpers'

import { getPopupConfig } from './PopupConfig'
import { PostModel } from '../../model'
import s from './Styles.module.scss'

function PostContent() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', py: 2, gap: 2 }}>
        <Chip
          label={t(`post:genre.${PostModel.genre}`)}
          sx={{
            backgroundColor: (theme) => theme.palette.grey[700],
            width: 'fit-content'
          }}
        />
        <Typography variant="h4">{PostModel.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          {PostModel.short_description}
        </Typography>

        <InformativeImage
          onClick={() =>
            navigate(generatePath(ROUTES.USERS_PROFILE, { id: String(PostModel.user_id) }))
          }
          imgUrl={`${API_USER_AVATAR_URL}/${PostModel.user_avatar}`}
          PrimaryText={
            <>
              {PostModel.user_name} {PostModel.user_surname} <CircleDevider />
              {fromTimestampToDate(PostModel.created_at)}
            </>
          }
          SecondaryText={t('post:readingTime', {
            minute: PostModel.reading_time
          })}
        />
      </Box>

      <Box display="flex" alignItems="center" justifyContent="center">
        <img
          className={s.postImg}
          src={`${API_POST_IMAGES_URL}/${PostModel.image}`}
          alt="Post cover"
        />
      </Box>

      <Box display="flex" alignItems="center" justifyContent="center" sx={{ pt: 2, pb: 2 }}>
        <Typography variant="body2" sx={{ width: '80%' }}>
          {parse(PostModel.description)}
        </Typography>
      </Box>

      <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mt: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
          <Tooltip
            title={PostModel.is_liked ? t('actions.unlike') : t('actions.like')}
            placement="bottom"
          >
            <IconButton
              onClick={async () => {
                await PostModel.toggleLike()
              }}
              sx={{
                color: (theme) =>
                  PostModel.is_liked ? theme.palette.error.dark : theme.palette.action.active,
                fontSize: 22,
                p: 0
              }}
            >
              {PostModel.is_liked ? <AiFillHeart /> : <AiOutlineHeart />}
            </IconButton>
          </Tooltip>

          <Typography variant="body2" color="text.secondary">
            {PostModel.likes_count}
          </Typography>
        </Box>

        <PopupMenu
          id={PostModel.id}
          ActionButton={(btnProps) => (
            <Tooltip title={t('actions.share')} placement="bottom">
              <IconButton
                {...btnProps}
                sx={{
                  fontSize: 22
                }}
              >
                <AiOutlineShareAlt />{' '}
              </IconButton>
            </Tooltip>
          )}
          config={getPopupConfig(t)}
        />
      </Box>
    </>
  )
}

export default observer(PostContent)
