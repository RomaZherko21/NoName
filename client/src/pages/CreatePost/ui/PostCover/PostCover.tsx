import React, { useRef } from 'react'
import { useFormikContext } from 'formik'
import { Avatar, Box, Button, Grid, Paper, Typography } from '@mui/material'
import { FiUpload } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'

import styles from './Styles.module.scss'

function PostCover() {
  const { t } = useTranslation()
  const hiddenFileInput = useRef<any>(null)

  const {
    values: { cover },
    setFieldValue,
  } = useFormikContext<any>()

  function handleUploadFile(event: any) {
    setFieldValue('cover', event.target.files[0])
  }

  return (
    <Paper elevation={1} sx={{ mb: 3 }}>
      <Grid container sx={{ p: 4 }}>
        <Grid item md={4}>
          <Typography variant="h6">{t('post:postCover')}</Typography>
        </Grid>

        <Grid item md={8} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {cover ? (
            <>
              <img alt="post cover" className={styles.postCover} src={URL.createObjectURL(cover)} />
              <Button
                size="large"
                sx={{
                  alignSelf: 'flex-start',
                  color: (theme) => theme.palette.secondary.contrastText,
                }}
                onClick={() => setFieldValue('cover', null)}
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
                <Typography variant="h6" sx={{ color: (theme) => theme.palette.text.secondary }}>
                  {t('post:actions.selectCoverImage')}
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
                  {t('post:hint.uploadFile')}
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{ color: (theme) => theme.palette.text.secondary }}
                >
                  {t('post:hint.filePermissions')}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default PostCover
