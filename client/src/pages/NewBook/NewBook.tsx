import { useState, useRef, useEffect, useMemo } from 'react'
import {
  Typography,
  Container,
  Paper,
  Grid,
  TextField,
  Box,
  Tooltip,
  InputAdornment,
  Button,
} from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import ClearIcon from '@mui/icons-material/Clear'
import PersonIcon from '@mui/icons-material/Person'
import DateRangeIcon from '@mui/icons-material/DateRange'
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits'
import { Formik } from 'formik'
import * as yup from 'yup'

import selectFile from 'assets/images/selectFile.svg'
import { MultiSelectField, PageHeader, Spinner } from 'shared/ui'
import { commonStringValidation } from 'shared/validations'

import { NewBookModel } from './model'

function NewBook() {
  const { t } = useTranslation()
  const hiddenFileInput = useRef<any>(null)
  const [image, setImage] = useState<any>(null)

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        nameOfTheBook: commonStringValidation(t(`book:nameOfTheBook`), 3),
        description: yup.string().required(
          t('validation:error.isRequired', {
            field: t('book:description'),
          })
        ),
        author: commonStringValidation(t(`book:author`), 3),
        year: yup
          .number()
          .min(
            1,
            t('validation:error.minSymbols', {
              field: t(`book:year`),
              count: 1,
            })
          )
          .max(
            NewBookModel.thisYear,
            t('validation:error.maxSymbols', {
              field: t(`book:year`),
              count: NewBookModel.thisYear,
            })
          )
          .required(
            t('validation:error.isRequired', {
              field: t('book:year'),
            })
          ),
        quantity: yup
          .number()
          .min(
            1,
            t('validation:error.minSymbols', {
              field: t(`book:quantity`),
              count: 1,
            })
          )
          .required(
            t('validation:error.isRequired', {
              field: t('book:quantity'),
            })
          ),
      }),
    [t]
  )

  useEffect(() => {
    NewBookModel.fetchGenres()
  }, [])

  function handleUploadFile(event: any) {
    setImage(event.target.files[0])
  }

  function onSubmit(values: any) {
    console.log(values)
  }

  return (
    <Container>
      <PageHeader pageName={t('page:newBook')} />

      {NewBookModel.loading.has ? (
        <Spinner />
      ) : (
        <>
          <Formik
            initialValues={{
              nameOfTheBook: '',
              description: '',
              author: '',
              genres: [],
              year: '',
              quantity: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => onSubmit(values)}
          >
            {({ handleSubmit, handleChange, values, setFieldValue, errors, touched }) => (
              <form onSubmit={handleSubmit}>
                <Paper elevation={1} sx={{ mb: 3 }}>
                  <Grid container sx={{ p: 4, pb: 8 }}>
                    <Grid item md={4}>
                      <Typography variant="h6">{t('user:basicDetails')}</Typography>
                    </Grid>
                    <Grid item md={8} sx={{ display: 'flex', flexDirection: 'column' }}>
                      <TextField
                        name="nameOfTheBook"
                        value={values.nameOfTheBook}
                        onChange={handleChange}
                        error={touched.nameOfTheBook && Boolean(errors.nameOfTheBook)}
                        helperText={touched.nameOfTheBook && errors.nameOfTheBook}
                        label={t('book:nameOfTheBook')}
                        fullWidth
                        sx={{ mb: 3 }}
                      />
                      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
                        {t('book:description')}
                      </Typography>
                      <ReactQuill
                        theme="snow"
                        value={values.description}
                        onChange={(html: string) => setFieldValue('description', html)}
                        style={{ height: 400, borderRadius: '8px' }}
                      />
                    </Grid>
                  </Grid>
                </Paper>
                <Paper elevation={1} sx={{ mb: 3 }}>
                  <Grid container sx={{ p: 4 }}>
                    <Grid item md={4}>
                      <Typography variant="h6" sx={{ mb: 1 }}>
                        {t('book:images')}
                      </Typography>
                      <Typography variant="subtitle2" color="text.secondary">
                        {t('book:imagesOnTheWebsite')}
                      </Typography>
                    </Grid>
                    <Grid item md={8} sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          p: 4,
                          border: (theme) => `1px dashed ${theme.palette.grey[500]}`,
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
                        <Box>
                          <img
                            alt="Select file"
                            src={selectFile}
                            style={{ height: 100, width: 100 }}
                          />
                        </Box>
                        <Box>
                          <Typography variant="h6" sx={{ mb: 1 }}>
                            {t('book:actions.selectFile')}
                          </Typography>
                          <Typography variant="body1" sx={{ mb: 1 }}>
                            {t('book:form.hint.selective')}
                          </Typography>
                        </Box>
                      </Box>
                      {image && (
                        <>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              p: 2,
                              mt: 2,
                              mb: 3,
                              border: (theme) => `1px solid ${theme.palette.grey[500]}`,
                              borderRadius: '8px',
                            }}
                          >
                            <Box display="flex" gap="8px">
                              <Box display="flex" alignItems="center">
                                <ContentCopyIcon fontSize="small" color="action" />
                              </Box>
                              <Box display="flex" flexDirection="column">
                                <Typography variant="subtitle2">{image.name}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {image.size} KB
                                </Typography>
                              </Box>
                            </Box>
                            <Box display="flex" alignItems="center" justifyContent="center">
                              <Tooltip title="Remove" placement="bottom">
                                <Button onClick={() => setImage(null)}>
                                  <ClearIcon fontSize="medium" color="action" />
                                </Button>
                              </Tooltip>
                            </Box>
                          </Box>
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="flex-end"
                            gap="10px"
                          >
                            <Button variant="text" onClick={() => setImage(null)}>
                              {t('book:actions.remove')}
                            </Button>
                            <Button variant="contained">{t('book:actions.upload')}</Button>
                          </Box>
                        </>
                      )}
                    </Grid>
                  </Grid>
                </Paper>
                <Paper elevation={1} sx={{ mb: 3 }}>
                  <Grid container sx={{ p: 4 }}>
                    <Grid item md={4}>
                      <Typography variant="h6" sx={{ mb: 1 }}>
                        {t('book:author')}
                      </Typography>
                      <Typography variant="subtitle2" color="text.secondary">
                        {t('book:form.hint.author')}
                      </Typography>
                    </Grid>
                    <Grid item md={8}>
                      <TextField
                        name="author"
                        value={values.author}
                        onChange={handleChange}
                        error={touched.author && Boolean(errors.author)}
                        helperText={touched.author && errors.author}
                        label={t('book:author')}
                        fullWidth
                        size="medium"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>
                </Paper>
                <Paper elevation={1} sx={{ mb: 3 }}>
                  <Grid container sx={{ p: 4 }}>
                    <Grid item md={4}>
                      <Typography variant="h6" sx={{ mb: 1 }}>
                        {t('book:genres')}
                      </Typography>
                      <Typography variant="subtitle2" color="text.secondary">
                        {t('book:form.hint.genres')}
                      </Typography>
                    </Grid>
                    <Grid item md={8}>
                      <MultiSelectField
                        field="genres"
                        label="book:genres"
                        options={NewBookModel.genres || []}
                      />
                    </Grid>
                  </Grid>
                </Paper>
                <Paper elevation={1} sx={{ mb: 3 }}>
                  <Grid container sx={{ p: 4 }}>
                    <Grid item md={4}>
                      <Typography variant="h6" sx={{ mb: 1 }}>
                        {t('book:year')}
                      </Typography>
                      <Typography variant="subtitle2" color="text.secondary">
                        {t('book:form.hint.year')}
                      </Typography>
                    </Grid>
                    <Grid item md={8}>
                      <TextField
                        name="year"
                        value={values.year}
                        onChange={handleChange}
                        error={touched.year && Boolean(errors.year)}
                        helperText={touched.year && errors.year}
                        label={t('book:year')}
                        fullWidth
                        size="medium"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <DateRangeIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>
                </Paper>
                <Paper elevation={1} sx={{ mb: 3 }}>
                  <Grid container sx={{ p: 4 }}>
                    <Grid item md={4}>
                      <Typography variant="h6" sx={{ mb: 1 }}>
                        {t('book:quantity')}
                      </Typography>
                      <Typography variant="subtitle2" color="text.secondary">
                        {t('book:form.hint.quantity')}
                      </Typography>
                    </Grid>
                    <Grid item md={8}>
                      <TextField
                        name="quantity"
                        value={values.quantity}
                        onChange={handleChange}
                        error={touched.quantity && Boolean(errors.quantity)}
                        helperText={touched.quantity && errors.quantity}
                        label={t('book:quantity')}
                        fullWidth
                        size="medium"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <ProductionQuantityLimitsIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>
                </Paper>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Button variant="text" color="error">
                      {t('translation:actions.delete')}
                    </Button>
                  </Box>
                  <Box display="flex" gap="10px">
                    <Button variant="outlined">{t('user:actions.cancel')}</Button>
                    <Button type="submit" variant="contained">
                      {t('book:actions.create')}
                    </Button>
                  </Box>
                </Box>
              </form>
            )}
          </Formik>
        </>
      )}
    </Container>
  )
}

export default observer(NewBook)
