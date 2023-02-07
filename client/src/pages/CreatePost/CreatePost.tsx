import { useEffect, useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import { Formik } from 'formik'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Box, Button, Grid, Paper, Typography } from '@mui/material'

import {
  commonNumberRangeValidation,
  commonStringValidation,
  fileValidation,
} from 'shared/validations'
import { InputField, QuillField, SelectField } from 'shared/ui'
import { MAX_IMAGE_SIZE, ROUTES, SUPPORTED_IMAGE_FORMATS } from 'shared/consts'
import { PageHeader } from 'widgets'

import { CreatePostModel } from './model'
import { PostCover } from './ui'

function CreatePost() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  useEffect(() => {
    CreatePostModel.fetch()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        postTitle: commonStringValidation(t(`post:postTitle`), 3),
        shortDescription: commonStringValidation(t(`post:shortDescription`), 5),
        genre: commonStringValidation(t(`post:genres`)),
        description: commonStringValidation(t(`post:description`), 30),
        readingTime: commonNumberRangeValidation({
          field: t(`post:form.readingTime`),
          min: 1,
          max: 60,
        }),
        cover: fileValidation({
          field: 'cover',
          maxSize: MAX_IMAGE_SIZE,
          fileFormats: SUPPORTED_IMAGE_FORMATS,
        }),
      }),
    [t]
  )

  return (
    <Formik
      initialValues={{
        postTitle: '',
        shortDescription: '',
        genre: '',
        description: '',
        readingTime: '',
        cover: null,
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        CreatePostModel.create({
          name: values.postTitle,
          short_description: values.shortDescription,
          genre_id: Number(values.genre),
          description: values.description,
          post: values.cover,
          reading_time: Number(values.readingTime),
        })
        navigate(ROUTES.POSTS)
        toast.success(t('notification:success.created'))
      }}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Box maxWidth="xl" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
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
                <SelectField
                  field="genre"
                  label="post:genres"
                  options={CreatePostModel.getGenresOptions()}
                />
              </Grid>
            </Grid>

            <PostCover field="cover" />

            <Grid component={Paper} container elevation={1} sx={{ p: 4 }}>
              <Grid item md={4}>
                <Typography variant="h6">{t('common.content')}</Typography>
              </Grid>
              <Grid item md={8} sx={{ display: 'flex', flexDirection: 'column' }}>
                <QuillField field="description" />
              </Grid>
            </Grid>

            <Grid component={Paper} container elevation={1} sx={{ p: 4 }}>
              <Grid item md={4}>
                <Typography variant="h6">{t('common.meta')}</Typography>
              </Grid>
              <Grid item md={8}>
                <Box>
                  <InputField field="readingTime" label="post:form.readingTime" />
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
                <Button size="small" component={Link} to={ROUTES.POSTS}>
                  {t('actions.cancel')}
                </Button>
                <Button size="small" type="submit" variant="contained">
                  {t('actions.post')}
                </Button>
              </Box>
            </Paper>
          </Box>
        </form>
      )}
    </Formik>
  )
}

export default observer(CreatePost)
