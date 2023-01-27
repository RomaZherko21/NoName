import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { Avatar, Button, Divider, Paper, Stack, Typography, IconButton, Box } from '@mui/material'
import ShareIcon from '@mui/icons-material/Share'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import FavoriteIcon from '@mui/icons-material/Favorite'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import TagFacesIcon from '@mui/icons-material/TagFaces'
import InsertLinkIcon from '@mui/icons-material/InsertLink'

import { NODE_API_POST_IMAGES_URL, NODE_API_USER_AVATAR_URL } from 'shared/consts'
import { InputFilter, PopupMenu } from 'shared/ui'
import { useRootStore } from 'stores'
import { Post as Postt } from 'shared/types'
import { PostsFilters } from 'pages/Posts/model'
import { ProfileModel } from 'pages/Profile/model'

import { getPopupConfig } from './PopupConfig'
import s from './Styles.module.scss'
import { Comment } from '../Comment'

interface Props {
  post: Postt
}

const Post = ({ post }: Props) => {
  const { t } = useTranslation()
  const { user } = useRootStore()
  const [filters] = useState<PostsFilters>({ user_id: user.id })

  return (
    <Paper sx={{ p: 4, mt: 2 }}>
      <Stack direction="row" spacing={1.2} alignItems="start">
        <Avatar
          alt="User avatar"
          sx={{ width: 54, height: 54 }}
          src={`${NODE_API_USER_AVATAR_URL}/${user.avatar.url}`}
        />
        <Stack spacing={0.5}>
          <Typography variant="subtitle1">
            {user.name} {user.surname}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          >
            <AccessTimeIcon /> {t('translation:fields.createdAt')}:{' '}
            {new Date(post.created_at).toLocaleDateString()}
          </Typography>
        </Stack>
      </Stack>
      <Stack direction="column" spacing={2} sx={{ mt: 3 }} alignItems="start">
        <Typography variant="body1">{post.name}</Typography>
        <img
          className={s.profileCover}
          src={`${NODE_API_POST_IMAGES_URL}/${post.image}`}
          alt="post cover"
        />
        <Box display="flex" alignItems="center" justifyContent="center" sx={{ p: 5, pt: 2, pb: 2 }}>
          <Typography variant="body2">{post.description}</Typography>
        </Box>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ width: '100%' }}
        >
          <Box display="flex" alignItems="center">
            <Button
              onClick={() => ProfileModel.toggleLike({ post_id: post.id, filters: filters })}
              startIcon={
                <FavoriteIcon
                  sx={{
                    color: (theme) =>
                      post.is_liked ? theme.palette.error.dark : theme.palette.action.active,
                  }}
                />
              }
              variant="outlined"
            >
              {post.likes_count}
            </Button>
          </Box>
          <IconButton>
            <PopupMenu
              ActionButton={(btnProps: any) => <ShareIcon {...btnProps} />}
              config={getPopupConfig(window.location.href, t)}
            />
          </IconButton>
        </Stack>
        <Divider sx={{ width: '100%', borderColor: (theme) => theme.palette.grey[700] }} />
        {post.comments.length && (
          <>
            <Box minWidth="100%">
              {post.comments.map((comment) => (
                <Comment comment={comment} />
              ))}
            </Box>
          </>
        )}
        <Divider sx={{ width: '100%', borderColor: (theme) => theme.palette.grey[700] }} />
        <Stack alignItems="start" direction="row" width="100%" spacing={3}>
          <Avatar
            alt="User avatar"
            sx={{ cursor: 'pointer', width: 40, height: 40 }}
            src={`${NODE_API_USER_AVATAR_URL}/${user.avatar.url}`}
          />
          <Stack direction="column" spacing={3} sx={{ width: '100%' }}>
            <InputFilter
              placeholder="user:actions.writeYourComment"
              multiline={true}
              rows={3}
              value={ProfileModel.comment}
              onChange={(e: any) => (ProfileModel.comment = e.target.value)}
            />
            <Stack
              direction="row"
              sx={{ mt: 2 }}
              alignItems="center"
              justifyContent="space-between"
            >
              <Stack direction="row">
                <IconButton aria-label="upload picture" component="label">
                  <input hidden accept="image/*" type="file" />
                  <AddAPhotoIcon />
                </IconButton>
                <IconButton aria-label="link" component="label">
                  <InsertLinkIcon />
                </IconButton>
                <IconButton aria-label="choose emoji" component="label">
                  <TagFacesIcon />
                </IconButton>
              </Stack>
              {ProfileModel.isEditActive ? (
                <Button
                  onClick={() => {
                    ProfileModel.editComment({ post_id: post.id, filters: filters })
                  }}
                  variant="contained"
                >
                  {t('actions.save')}
                </Button>
              ) : (
                <Button
                  onClick={() => ProfileModel.addNewComment({ post_id: post.id, filters: filters })}
                  variant="contained"
                >
                  {t('actions.post')}
                </Button>
              )}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  )
}

export default observer(Post)
