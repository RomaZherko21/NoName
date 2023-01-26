import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams, useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import {
  Box,
  Container,
  Paper,
  Typography,
  IconButton,
  Button,
  Grid,
  Divider,
  Stack,
  Avatar,
} from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import TagFacesIcon from '@mui/icons-material/TagFaces'
import InsertLinkIcon from '@mui/icons-material/InsertLink'

import { InputFilter, PageHeader, PopupMenu, Spinner } from 'shared/ui'
import { NODE_API_POST_IMAGES_URL, NODE_API_USER_AVATAR_URL, ROUTES } from 'shared/consts'
import { useRootStore } from 'stores'

import PostModel from './model/Post.model'
import { getPopupConfig } from './PopupConfig'
import styles from './Styles.module.scss'
import { Comment } from './ui'

function Post() {
  const { t } = useTranslation()
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useRootStore()
  const inputRef = useRef<any>(null)

  useEffect(() => {
    PostModel.fetch({ id: Number(id) })
  }, [id])

  return (
    <Container>
      <PageHeader pageName={t('page:post')}>
        <Grid item>
          <Button variant="text" size="large" onClick={() => navigate(ROUTES.POSTS)}>
            {t('translation:actions.goBack')}
          </Button>
        </Grid>
      </PageHeader>
      {PostModel.loading.has ? (
        <Spinner />
      ) : (
        <Paper elevation={1} sx={{ mb: 3 }}>
          <Box display="flex" flexDirection="column" sx={{ p: 4 }}>
            <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
              <img
                className={styles.userAvatar}
                src={`${NODE_API_USER_AVATAR_URL}/${PostModel.user_avatar}`}
                alt="User cover"
              />
              <Typography variant="subtitle2" color="textSecondary" sx={{ mr: 1 }}>
                {PostModel.user_name} {PostModel.user_surname}
              </Typography>
              <Typography variant="caption" color="textSecondary" sx={{ mt: 0.5 }}>
                {t('translation:fields.createdAt')}:{' '}
                {new Date(PostModel.created_at).toLocaleDateString()}
              </Typography>
            </Box>
            <Typography variant="h4">{PostModel.name}</Typography>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ pr: 4, pl: 4, mb: 2 }}
          >
            <img
              className={styles.postImg}
              src={`${NODE_API_POST_IMAGES_URL}/${PostModel.image}`}
              alt="Post cover"
            />
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ p: 15, pt: 2, pb: 2 }}
          >
            <Typography variant="body2">{PostModel.description}</Typography>
          </Box>
          <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ p: 3 }}>
            <Box display="flex" alignItems="center">
              <Button
                onClick={() => PostModel.toggleLike()}
                startIcon={
                  <FavoriteIcon
                    sx={{
                      color: (theme) =>
                        PostModel.is_liked ? theme.palette.error.dark : theme.palette.action.active,
                    }}
                  />
                }
                variant="outlined"
              >
                {PostModel.likes_count}
              </Button>
            </Box>
            <IconButton>
              <PopupMenu
                id={PostModel.id}
                ActionButton={(btnProps: any) => <ShareIcon {...btnProps} />}
                config={getPopupConfig(window.location.href, t)}
              />
            </IconButton>
          </Box>
          {PostModel.comments.length && (
            <>
              <Box pl={4} pr={4} mb={4}>
                <Divider sx={{ width: '100%', borderColor: (theme) => theme.palette.grey[700] }} />
              </Box>
              {PostModel.comments.map((comment) => (
                <Comment comment={comment} />
              ))}
            </>
          )}
          <Box pl={4} pr={4} mt={4}>
            <Divider sx={{ width: '100%', borderColor: (theme) => theme.palette.grey[700] }} />
          </Box>
          <Stack alignItems="start" direction="row" width="100%" spacing={3} padding={4}>
            <Avatar
              alt="User avatar"
              sx={{ cursor: 'pointer', width: 40, height: 40 }}
              src={`${NODE_API_USER_AVATAR_URL}/${user.avatar.url}`}
            />
            <Stack direction="column" spacing={3} sx={{ width: '100%' }}>
              <InputFilter
                placeholder="actions.writeYourComment"
                multiline={true}
                rows={3}
                value={PostModel.comment}
                onChange={(e: any) => (PostModel.comment = e.target.value)}
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
                {PostModel.isEditActive ? (
                  <Button
                    onClick={() => {
                      inputRef.current?.focus()
                      PostModel.editComment()
                    }}
                    variant="contained"
                  >
                    {t('actions.save')}
                  </Button>
                ) : (
                  <Button onClick={() => PostModel.addNewComment()} variant="contained">
                    {t('actions.post')}
                  </Button>
                )}
              </Stack>
            </Stack>
          </Stack>
        </Paper>
      )}
    </Container>
  )
}

export default observer(Post)
