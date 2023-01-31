import { useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import { Formik } from 'formik'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Box, Button, Container, Grid, Paper, Typography } from '@mui/material'

import { commonNumberRangeValidation, commonStringValidation } from 'shared/validations'
import { InputField, PageHeader } from 'shared/ui'
import { useRootStore } from 'stores'
import { ROUTES } from 'shared/consts'

import { CreatePostModel } from './model'
import { PostCover, QuillField } from './ui'

function CreatePost() {
  const { t } = useTranslation()
  const { user } = useRootStore()
  const navigate = useNavigate()

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        postTitle: commonStringValidation(t(`post:postTitle`), 3),
        shortDescription: commonStringValidation(t(`post:shortDescription`), 5),
        description: commonStringValidation(t(`post:description`), 10),
        readingTime: commonNumberRangeValidation({ field: t(`post:readingTime`), min: 1, max: 60 }),
      }),
    [t]
  )

  return (
    <Formik
      initialValues={{
        postTitle: '',
        shortDescription: '',
        description: '',
        postCover: '',
        readingTime: '',
        cover: null,
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        CreatePostModel.create({
          name: values.postTitle,
          description: values.shortDescription,
          post: values.cover || '',
          user_id: user.id,
        })
        navigate(ROUTES.POSTS)
        toast.success(t('notification:success.created'))
      }}
    >
      {({ handleSubmit, values, setFieldValue }) => (
        <form onSubmit={handleSubmit}>
          <Container maxWidth="xl" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <PageHeader
              pageName={t('page:createPost')}
              breadcrumbs={[{ text: 'page:posts' }, { text: 'page:sub.create' }]}
            />

            <Grid component={Paper} container elevation={1} sx={{ p: 4 }}>
              <Grid item md={4}>
                <Typography variant="h6">{t('common.basicDetails')}</Typography>
              </Grid>
              <Grid item md={8} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <InputField field="postTitle" label="post:postTitle" />
                <InputField field="shortDescription" label="post:shortDescription" />
              </Grid>
            </Grid>

            <PostCover />

            <Grid component={Paper} container elevation={1} sx={{ p: 4 }}>
              <Grid item md={4}>
                <Typography variant="h6">{t('common.content')}</Typography>
              </Grid>
              <Grid item md={8} sx={{ display: 'flex', flexDirection: 'column' }}>
                <QuillField />
              </Grid>
            </Grid>

            <Grid component={Paper} container elevation={1} sx={{ p: 4 }}>
              <Grid item md={4}>
                <Typography variant="h6">{t('common.meta')}</Typography>
              </Grid>
              <Grid item md={8}>
                <Box>
                  <InputField field="readingTime" label="post:readingTime" />
                </Box>
              </Grid>
            </Grid>

            <Paper elevation={1}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  p: 2.5,
                  gap: 1,
                }}
              >
                <Button onClick={() => navigate(ROUTES.POSTS)}>{t('actions.cancel')}</Button>
                <Button type="submit" variant="contained">
                  {t('post:actions.publishChanges')}
                </Button>
              </Box>
            </Paper>
          </Container>
        </form>
      )}
    </Formik>
  )
}

export default observer(CreatePost)
