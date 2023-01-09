import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Container, Grid, Paper, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'

import { PageHeader, Spinner } from 'shared/ui'
import ProfileCover from 'assets/images/cover.jpg'

import styles from './Styles.module.scss'
import PostModel from './model/Post.model'

function Post() {
  const { t } = useTranslation()
  const { id } = useParams()

  useEffect(() => {
    PostModel.fetchPost(id)
  }, [])

  return (
    <Container>
      <PageHeader pageName={t('page:post')} />
      {PostModel.loading.has ? (
        <Spinner />
      ) : (
        <Paper elevation={1} sx={{ mb: 3 }}>
          <Box display="flex" alignItems="center" sx={{ p: 4 }}>
            <Typography variant="h6">{PostModel.name}</Typography>
          </Box>
          <Grid item xs={12} sx={{ mb: 2 }}>
            <img className={styles.profileCover} src={ProfileCover} alt="profile cover" />
          </Grid>
          <Box display="flex" alignItems="center" justifyContent="center" sx={{ p: 1 }}>
            <Typography variant="body2" color="textSecondary">
              {PostModel.description}
            </Typography>
          </Box>
        </Paper>
      )}
    </Container>
  )
}

export default Post
