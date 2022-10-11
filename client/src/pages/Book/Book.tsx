import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import { Grid, Typography } from '@mui/material'

import { BookInfo } from './ui/BookInfo'
import { BookForm } from './ui/BookForm'
import { Helmet } from 'react-helmet'
import { BookModel } from './model'
import { useEffect } from 'react'

function Book() {
  const { t } = useTranslation()

  useEffect(() => {
    BookModel.fetch()
  }, [])

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
          <BookInfo />
        </Grid>
        <Grid item lg={8} md={6} xs={12}>
          <BookForm />
        </Grid>
      </Grid>
    </>
  )
}

export default observer(Book)
