import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet'
import { observer } from 'mobx-react-lite'
import { Grid, Typography } from '@mui/material'

import { AuthorBooks, AuthorInfo } from './ui'
import { BookModel } from './model'

function Author() {
  const { t } = useTranslation()
  const { id } = useParams()

  useEffect(() => {
    if (Number(id)) {
      BookModel.fetch(Number(id))
    }
  }, [id])

  return (
    <>
      <Helmet>
        <title>{t('page:book')}</title>
        <meta name="description" content={t('page:book')} />
      </Helmet>

      <Grid container>
        <Grid item>
          <Typography variant="h3" color="text.primary">
            {t('page:book')}
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item lg={4} md={6} xs={12}>
          <AuthorInfo />
        </Grid>
        <Grid item lg={8} md={6} xs={12}>
          <AuthorBooks />
        </Grid>
      </Grid>
    </>
  )
}

export default observer(Author)
