import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams, useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Container, Button, Grid } from '@mui/material'

import { PageHeader, Spinner } from 'shared/ui'
import { ROUTES } from 'shared/consts'

import { PostModel } from './model'
import { Comments, PostContent } from './ui'

function Post() {
  const { t } = useTranslation()
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    PostModel.fetch({ id: Number(id) })
  }, [id])

  return (
    <Container maxWidth="xl">
      <PageHeader
        pageName={t('page:post')}
        breadcrumbs={[{ text: 'page:posts' }, { text: 'page:sub.details' }]}
      >
        <Grid item>
          <Button variant="text" size="large" onClick={() => navigate(ROUTES.POSTS)}>
            {t('translation:actions.goBack')}
          </Button>
        </Grid>
      </PageHeader>

      {PostModel.loading.has ? (
        <Spinner />
      ) : (
        <>
          <PostContent />
          <Comments comments={PostModel.comments} />
        </>
      )}
    </Container>
  )
}

export default observer(Post)
