import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import { Button, Grid, Typography } from '@mui/material'

import { useDialog } from 'shared/hooks'
import { CommonCard, Pagination, Spinner } from 'shared/ui'
import { API_URL } from 'shared/consts'

import { CreatePostForm, getPopupConfig } from './ui'
import { PostsModel } from './model'
import { Helmet } from 'react-helmet'

function Posts() {
  const { t } = useTranslation()

  const popupConfig = useMemo(() => getPopupConfig(), [])

  useEffect(() => {
    PostsModel.fetch()
  }, [PostsModel.pagination.page, PostsModel.pagination.perPage])

  const [showCreateItemModal] = useDialog('post:form.create', (hideModal) => (
    <CreatePostForm hideModal={hideModal} />
  ))

  return (
    <>
      <Helmet>
        <title>{t('page:posts')}</title>
        <meta name="description" content={t('page:posts')} />
      </Helmet>

      <Grid spacing={2} container style={{ justifyContent: 'space-between' }}>
        <Grid item>
          <Typography variant="h3" color="text.primary">
            {t('page:posts')}
          </Typography>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={showCreateItemModal}>
            {t('post:form.create')}
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={3} direction="column" style={{ marginTop: '12px' }}>
        <Grid item container spacing={2}>
          {PostsModel.loading.has ? (
            <Spinner />
          ) : (
            PostsModel.posts.map((post) => (
              <Grid item sm={6} md={4} lg={3} sx={{ width: '100%' }}>
                <CommonCard
                  id={post.id}
                  name={post.name}
                  description={post.description}
                  imageUrl={`${API_URL}/uploads/post/${post.image}`}
                  creatorAvatarUrl={`${API_URL}/uploads/avatar/${post.avatar}`}
                  createdAt={post.createdAt}
                  popupConfig={popupConfig}
                />
              </Grid>
            ))
          )}
        </Grid>
        <Grid item>
          <Pagination paginationModel={PostsModel.pagination} />
        </Grid>
      </Grid>
    </>
  )
}

export default observer(Posts)