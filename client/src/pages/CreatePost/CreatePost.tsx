import { useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import { Formik } from 'formik'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Box, Button, Container, Grid, Paper, Typography } from '@mui/material'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import { commonNumberRangeValidation, commonStringValidation } from 'shared/validations'
import { InputField, PageHeader } from 'shared/ui'
import { useRootStore } from 'stores'

import { CreatePostModel } from './model'
import { PostCover } from './ui'

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
        navigate('/posts')
        toast.success(t('notification:successful.created'))
      }}
    >
      {({ handleSubmit, values, setFieldValue }) => (
        <form onSubmit={handleSubmit}>
          <Container maxWidth="xl">
            <PageHeader pageName={t('page:createNewPost')} />

            <Paper elevation={1} sx={{ mb: 3 }}>
              <Grid container sx={{ p: 4 }}>
                <Grid item md={4}>
                  <Typography variant="h6">{t('common.basicDetails')}</Typography>
                </Grid>
                <Grid item md={8} sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ mb: 3 }}>
                    <InputField field="postTitle" label="post:postTitle" />
                  </Box>
                  <Box sx={{ mb: 3 }}>
                    <InputField field="shortDescription" label="post:shortDescription" />
                  </Box>
                </Grid>
              </Grid>
            </Paper>

            <PostCover />

            <Paper elevation={1} sx={{ mb: 3 }}>
              <Grid container sx={{ p: 4, pb: 10 }}>
                <Grid item md={4}>
                  <Typography variant="h6">{t('common.content')}</Typography>
                </Grid>
                <Grid item md={8} sx={{ display: 'flex', flexDirection: 'column' }}>
                  <ReactQuill
                    theme="snow"
                    value={values.description}
                    onChange={(html: string) => setFieldValue('description', html)}
                    style={{ height: 400 }}
                  />
                </Grid>
              </Grid>
            </Paper>

            <Paper elevation={1} sx={{ mb: 3 }}>
              <Grid container sx={{ p: 4 }}>
                <Grid item md={4}>
                  <Typography variant="h6">{t('common.meta')}</Typography>
                </Grid>
                <Grid item md={8} sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ mb: 1 }}>
                    <Typography variant="subtitle1">{t('post:hint.readingTime')}</Typography>
                  </Box>
                  <Box sx={{ mb: 3 }}>
                    <InputField field="readingTime" label="post:readingTime" />
                  </Box>
                </Grid>
              </Grid>
            </Paper>

            <Paper elevation={16} sx={{ mb: 3 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  p: 2.5,
                  pl: 3.5,
                  gap: 1,
                }}
              >
                <Button
                  size="medium"
                  sx={{ color: (theme) => theme.palette.text.primary }}
                  onClick={() => navigate('/posts')}
                >
                  {t('common.cancel')}
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  size="medium"
                  sx={{ color: (theme) => theme.palette.text.primary }}
                >
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
