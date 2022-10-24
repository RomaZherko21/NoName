import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet'
import { observer } from 'mobx-react-lite'
import { Grid, Typography } from '@mui/material'

import { PercentageCircle } from 'shared/ui'

import { BookInfo, BookForm, SimilarBooks } from './ui'
import { BookModel } from './model'

function Book() {
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
        <Grid item lg={3} md={4} xs={12}>
          <BookInfo />
        </Grid>
        <Grid item lg={9} md={6} xs={12}>
          <BookForm />
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <SimilarBooks />
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <PercentageCircle percentage={10} caption="Book rate" color="warning" />
          <PercentageCircle percentage={50} caption="Book rate" color="neutral" />
          <PercentageCircle percentage={90} caption="Book rate" color="success" />
        </Grid>
      </Grid>
    </>
  )
}

export default observer(Book)
