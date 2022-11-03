import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import { Box, Button, Grid } from '@mui/material'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'

import { PageHeader, PercentageCircle } from 'shared/ui'

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
      <PageHeader pageName={t('page:book')}>
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
      </PageHeader>

      <Grid container spacing={3}>
        <Grid item md={4} xs={12}>
          <BookInfo />
        </Grid>
        <Grid item md={8} xs={12}>
          <BookDescription />
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <SimilarBooks />
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <PercentageCircle
            percentage={BookModel.popularityPercentage}
            caption={t('book:bookReadability')}
            color={BookModel.getBookReadibilityStatus()}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default observer(Book)
