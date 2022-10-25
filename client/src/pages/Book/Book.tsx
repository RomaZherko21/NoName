import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet'
import { observer } from 'mobx-react-lite'
import { Box, Button, Grid, Typography } from '@mui/material'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'

import { PercentageCircle } from 'shared/ui'

import { BookInfo, BookDescription, SimilarBooks, BookForm } from './ui'
import { BookModel } from './model'
import { useDialog } from 'shared/hooks'

function Book() {
  const { t } = useTranslation()
  const { id } = useParams()

  useEffect(() => {
    if (Number(id)) {
      BookModel.fetch(Number(id))
    }
  }, [id])

  const [showCreateUserModal] = useDialog('book:form.updateBook', (hideModal) => (
    <BookForm hideModal={hideModal} />
  ))

  return (
    <>
      <Helmet>
        <title>{t('page:book')}</title>
        <meta name="description" content={t('page:book')} />
      </Helmet>

      <Grid spacing={2} container style={{ justifyContent: 'space-between' }}>
        <Grid item>
          <Typography variant="h3" color="text.primary">
            {t('page:book')}
          </Typography>
        </Grid>
        <Grid item>
          <Box sx={{ m: 1 }}>
            <Button
              onClick={showCreateUserModal}
              startIcon={<EditOutlinedIcon fontSize="small" />}
              sx={{ mr: 1 }}
            >
              {t('actions.edit')}
            </Button>
            <Button startIcon={<FileDownloadIcon fontSize="small" />} sx={{ mr: 1 }}>
              {t('actions.download')}
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item lg={3} md={4} xs={12}>
          <BookInfo />
        </Grid>
        <Grid item lg={9} md={6} xs={12}>
          <BookDescription />
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
