import { format } from 'date-fns'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import { Box, Typography, IconButton, Stack, Avatar, Tooltip, Chip } from '@mui/material'
import { AiOutlineHeart, AiFillHeart, AiOutlineShareAlt } from 'react-icons/ai'

import { PopupMenu } from 'shared/ui'
import { NODE_API_POST_IMAGES_URL, NODE_API_USER_AVATAR_URL } from 'shared/consts'
import { useRootStore } from 'stores'

import { getPopupConfig } from './PopupConfig'
import { PostModel } from '../../model'
import s from './Styles.module.scss'

function PostContent() {
  const { t } = useTranslation()
  const { user } = useRootStore()

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', py: 2, gap: 2 }}>
        <Chip
          label={t(`post:genre.${PostModel.genre}`)}
          sx={{ backgroundColor: (theme) => theme.palette.grey[700], width: 'fit-content' }}
        />
        <Typography variant="h4">{PostModel.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          {PostModel.short_description}
        </Typography>

        <Stack direction="row" spacing={1.25} alignItems="center">
          <Avatar
            alt="User avatar"
            sx={{ cursor: 'pointer' }}
            src={`${NODE_API_USER_AVATAR_URL}/${PostModel.user_avatar}`}
          />
          <Box>
            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
              {PostModel.user_name} {PostModel.user_surname}{' '}
              <Box
                sx={{
                  width: '6px',
                  height: '6px',
                  backgroundColor: 'text.primary',
                  borderRadius: 50,
                }}
              />
              {format(PostModel.created_at, 'MMMM dd, yyyy')}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {t('post:readingTime', { minute: PostModel.reading_time })}
            </Typography>
          </Box>
        </Stack>
      </Box>

      <Box display="flex" alignItems="center" justifyContent="center">
        <img
          className={s.postImg}
          src={`${NODE_API_POST_IMAGES_URL}/${PostModel.image}`}
          alt="Post cover"
        />
      </Box>

      <Box display="flex" alignItems="center" justifyContent="center" sx={{ pt: 2, pb: 2 }}>
        <Typography variant="body2" sx={{ width: '80%' }}>
          {PostModel.description}
        </Typography>
      </Box>

      <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mt: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
          <Tooltip
            title={PostModel.is_liked ? t('actions.unlike') : t('actions.like')}
            placement="bottom"
          >
            <IconButton
              onClick={() => PostModel.toggleLike()}
              sx={{
                color: (theme) =>
                  PostModel.is_liked ? theme.palette.error.dark : theme.palette.action.active,
                fontSize: 22,
                p: 0,
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
          ActionButton={(btnProps: any) => (
            <Tooltip title={t('actions.share')} placement="bottom">
              <IconButton
                {...btnProps}
                sx={{
                  fontSize: 22,
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
