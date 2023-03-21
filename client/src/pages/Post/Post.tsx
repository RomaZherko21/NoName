import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams, useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Button, Grid } from '@mui/material'

import { Spinner } from 'shared/ui'
import { PageHeader } from 'widgets'

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
    <>
      <PageHeader
        pageName={t('page:post')}
        breadcrumbs={[{ text: 'page:posts' }, { text: 'page:sub.details' }]}
      >
        <Grid item>
          <Button
            variant="text"
            size="large"
            onClick={() => {
              navigate(-1)
            }}
          >
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
    </>
  )
}

export default observer(Post)
