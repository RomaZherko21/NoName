import { useMemo, useRef, useState } from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Avatar, Box, Button, Container, Grid, Paper, Typography } from '@mui/material'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import { commonNumberRangeValidation, commonStringValidation } from 'shared/validations'
import { InputField, PageHeader } from 'shared/ui'
import { FiUpload } from 'react-icons/fi'
import { useRootStore } from 'stores'

import styles from './Styles.module.scss'
import { CreatePostModel } from './model'

function CreatePost() {
  const { t } = useTranslation()
  const { user } = useRootStore()
  const hiddenFileInput = useRef<any>(null)
  const navigate = useNavigate()
  const [postCover, setPostCover] = useState(null)

  function handleUploadFile(event: any) {
    setPostCover(event.target.files[0])
  }

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
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        CreatePostModel.create({
          name: values.postTitle,
          description: values.shortDescription,
          post: postCover || '',
          user_id: user.id,
        })
        navigate('/posts')
        toast.success(t('notification:successful.created'))
      }}
    >
      {({ handleSubmit, values, setFieldValue }) => (
        <form onSubmit={handleSubmit}>
          <Box pt="4rem">
            <Container>
              <PageHeader pageName={t('page:createANewPost')} />
              <Paper elevation={1} sx={{ mb: 3 }}>
                <Grid container sx={{ p: 4 }}>
                  <Grid item md={4}>
                    <Typography variant="h6">{t('post:basicDetails')}</Typography>
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

              <Paper elevation={1} sx={{ mb: 3 }}>
                <Grid container sx={{ p: 4 }}>
                  <Grid item md={4}>
                    <Typography variant="h6">{t('post:postCover')}</Typography>
                  </Grid>
                  <Grid item md={8} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {postCover ? (
                      <>
                        <img
                          alt="post cover"
                          className={styles.postCover}
                          src={URL.createObjectURL(postCover)}
                        />
                        <Button
                          size="large"
                          sx={{
                            alignSelf: 'flex-start',
                            color: (theme) => theme.palette.secondary.contrastText,
                          }}
                          onClick={() => setPostCover(null)}
                        >
                          {t('post:actions.removePhoto')}
                        </Button>
                      </>
                    ) : (
                      <>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            border: (theme) => `1px dashed ${theme.palette.divider}`,
                            borderRadius: '8px',
                            p: 2,
                            minHeight: '240px',
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{ color: (theme) => theme.palette.text.secondary }}
                          >
                            {t('post:actions.selectACoverImage')}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            sx={{ color: (theme) => theme.palette.text.secondary }}
                          >
                            {t('post:whereImagesAreUsed')}
                          </Typography>
                        </Box>
                        <Button
                          disabled
                          size="large"
                          sx={{
                            alignSelf: 'flex-start',
                            color: (theme) => theme.palette.text.disabled,
                          }}
                        >
                          {t('post:actions.removePhoto')}
                        </Button>
                      </>
                    )}
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: 3,
                        border: (theme) => `1px dashed ${theme.palette.divider}`,
                        borderRadius: '8px',
                        minHeight: '160px',
                        cursor: 'pointer',
                      }}
                      onClick={() => hiddenFileInput.current.click()}
                    >
                      <input
                        id="upload-file"
                        name="avatar"
                        type="file"
                        accept="image/*"
                        ref={hiddenFileInput}
                        onChange={handleUploadFile}
                        style={{ display: 'none' }}
                      />
                      <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Avatar
                          variant="circular"
                          sx={{
                            width: '64px',
                            height: '64px',
                            backgroundColor: (theme) => theme.palette.grey[300],
                            mr: 2,
                          }}
                        >
                          <FiUpload />
                        </Avatar>
                        <Box>
                          <Typography variant="body1" sx={{ mb: 1 }}>
                            {t('Click to upload select file or drag and drop')}
                          </Typography>
                          <Typography
                            variant="subtitle2"
                            sx={{ color: (theme) => theme.palette.text.secondary }}
                          >
                            {t('(SVG, JPG, PNG, or gif maximum 900x400)')}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>

              <Paper elevation={1} sx={{ mb: 3 }}>
                <Grid container sx={{ p: 4, pb: 10 }}>
                  <Grid item md={4}>
                    <Typography variant="h6">{t('post:content')}</Typography>
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
                    <Typography variant="h6">{t('post:meta')}</Typography>
                  </Grid>
                  <Grid item md={8} sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ mb: 1 }}>
                      <Typography variant="subtitle1">{t('post:readingTimeHint')}</Typography>
                    </Box>
                    <Box sx={{ mb: 3 }}>
                      <InputField field="readingTime" label="post:readingTime" />
                    </Box>
                  </Grid>
                </Grid>
              </Paper>

              <Paper elevation={16} sx={{ mb: 3 }}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="flex-end"
                  p={2.5}
                  pl={3.5}
                  gap={1}
                >
                  <Button
                    size="medium"
                    sx={{ color: (theme) => theme.palette.text.primary }}
                    onClick={() => navigate('/posts')}
                  >
                    {t('post:actions.cancel')}
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
          </Box>
        </form>
      )}
    </Formik>
  )
}

export default CreatePost
