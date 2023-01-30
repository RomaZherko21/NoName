import { Formik } from 'formik'
import { Box, Button, Container, Grid, Paper, Tooltip, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import ClearIcon from '@mui/icons-material/Clear'

import { InputField, PageHeader } from 'shared/ui'

function CreatePost() {
  const { t } = useTranslation()

  return (
    <Formik
      initialValues={{
        PostTitle: '',
        ShortDescription: '',
        PostCover: '',
      }}
      onSubmit={(values) => console.log(values)}
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
                      <InputField field="PostTitle" label="post:postTitle" />
                    </Box>
                    <Box sx={{ mb: 3 }}>
                      <InputField field="ShortDescription" label="post:shortDescription" />
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
                        Select a cover image
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        sx={{ color: (theme) => theme.palette.text.secondary }}
                      >
                        Image used for the blog post cover and also for Open Graph meta
                      </Typography>
                    </Box>
                    <Button>Remove photo</Button>
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
                          <Typography variant="subtitle2">somth</Typography>
                          <Typography variant="body2" color="text.secondary">
                            12312312 KB
                          </Typography>
                        </Box>
                      </Box>
                      <Box display="flex" alignItems="center" justifyContent="center">
                        <Tooltip title="Remove" placement="bottom">
                          <Button onClick={() => console.log(null)}>
                            <ClearIcon fontSize="medium" color="action" />
                          </Button>
                        </Tooltip>
                      </Box>
                    </Box>
                    <Box display="flex" alignItems="center" justifyContent="flex-end" gap="10px">
                      <Button variant="text" onClick={() => console.log(null)}>
                        {t('book:actions.remove')}
                      </Button>
                      <Button variant="contained">{t('book:actions.upload')}</Button>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Container>
          </Box>
        </form>
      )}
    </Formik>
  )
}

export default CreatePost
