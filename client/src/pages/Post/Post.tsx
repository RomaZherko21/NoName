import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Box, Container, Paper, Typography, IconButton, Button, Grid } from '@mui/material'
import CommentIcon from '@mui/icons-material/Comment'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'

import { PageHeader, Spinner } from 'shared/ui'
import { NODE_API_POST_IMAGES_URL, NODE_API_USER_AVATAR_URL } from 'shared/consts'

import styles from './Styles.module.scss'
import PostModel from './model/Post.model'

function Post() {
  const { t } = useTranslation()
  const { id } = useParams()

  useEffect(() => {
    PostModel.fetchPost(id)
  }, [id])

  return (
    <Container>
      <PageHeader pageName={t('page:post')}>
        <Grid item>
          <Button variant="text" size="large">
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
                src={`${NODE_API_USER_AVATAR_URL}/${PostModel.avatar}`}
                alt="User cover"
              />
              <Typography variant="subtitle2" color="textSecondary" sx={{ mr: 1 }}>
                {PostModel.userName} {PostModel.userSurname}
              </Typography>
              <Typography variant="caption" color="textSecondary" sx={{ mt: 0.5 }}>
                {t('post:createdAt')}: {new Date(PostModel.created_at).toLocaleDateString()}
              </Typography>
            </Box>
            <Typography variant="h4">{PostModel.name}</Typography>
          </Box>
          <Box display="flex" alignItems="center" justifyContent="center" sx={{ mb: 2 }}>
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
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <Typography variant="subtitle1" color="textSecondary" sx={{ mr: 1 }}>
                0
              </Typography>
              <IconButton aria-label="comment">
                <CommentIcon />
              </IconButton>
            </Box>
            <IconButton aria-label="shared">
              <ShareIcon />
            </IconButton>
          </Box>
        </Paper>
      )}
    </Container>
  )
}

export default observer(Post)
