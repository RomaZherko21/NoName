import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import { Grid } from '@mui/material'

import { AuthorBooks, AuthorInfo } from './ui'
import { AuthorModel } from './model'
import { PageHeader } from 'shared/ui'

function Author() {
  const { t } = useTranslation()
  const { id } = useParams()

  useEffect(() => {
    if (Number(id)) {
      AuthorModel.fetch(Number(id))
    }
  }, [id])

  return (
    <>
      <PageHeader pageName={t('page:author')} />

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
