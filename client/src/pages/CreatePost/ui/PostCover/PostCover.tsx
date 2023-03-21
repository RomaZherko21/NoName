import { useRef } from 'react'
import { useFormikContext } from 'formik'
import { Avatar, Box, Button, Grid, Paper, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { FiUpload } from 'react-icons/fi'

import s from './Styles.module.scss'

interface Props {
  field: string
}

function PostCover({ field }: Props) {
  const { t } = useTranslation()
  const hiddenFileInput = useRef<HTMLInputElement>(null)

  const { values, touched, errors, setFieldValue } = useFormikContext<{
    [key: string]: any
  }>()

  const hasError = touched[field] && errors[field]

  function handleUploadFile(e: React.ChangeEvent<HTMLInputElement>) {
    setFieldValue(field, e.target.files?.[0])
  }

  return (
    <Grid component={Paper} container elevation={1} sx={{ p: 4 }}>
      <Grid item md={4}>
        <Typography variant="h6">{t('post:postCover')}</Typography>
      </Grid>

      <Grid item md={8} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box
          sx={{
            border: (theme) => (!values[field] ? `1px dashed ${theme.palette.divider}` : ''),
            borderRadius: 1
          }}
          className={s.uploadedPhoto}
        >
          {values[field] ? (
            <img
              alt="Post cover"
              className={s.postCover}
              src={URL.createObjectURL(values[field])}
            />
          ) : (
            <>
              <Typography variant="h6" sx={{ color: (theme) => theme.palette.text.secondary }}>
                {t('post:actions.selectCoverImage')}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ color: (theme) => theme.palette.text.secondary }}
              >
                {t('post:whereImagesAreUsed')}
              </Typography>
            </>
          )}
        </Box>

        <Button
          onClick={() => {
            setFieldValue(field, null)
          }}
          disabled={!values[field]}
          size="large"
          sx={{
            alignSelf: 'flex-start',
            color: (theme) => theme.palette.secondary.contrastText
          }}
        >
          {t('post:actions.removePhoto')}
        </Button>

        <Box
          onClick={() => hiddenFileInput.current?.click()}
          sx={{
            border: (theme) =>
              `1px dashed ${hasError ? theme.palette.error.main : theme.palette.divider}`,
            borderRadius: 1,
            '&:hover': {
              backgroundColor: (theme) => theme.palette.action.hover,
              opacity: 0.6
            }
          }}
          className={s.uploadPhoto}
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

          <Avatar
            variant="circular"
            sx={{
              width: '64px',
              height: '64px',
              backgroundColor: (theme) =>
                hasError ? theme.palette.error.main : theme.palette.grey[300],
              mr: 2
            }}
          >
            <FiUpload />
          </Avatar>

          <Box>
            <Typography variant="body1" color={hasError ? 'error.main' : 'text.primary'}>
              {t('post:hint.uploadFile')}
            </Typography>
            <Typography variant="subtitle2" color={hasError ? 'error.main' : 'text.secondary'}>
              {t('post:hint.filePermissions')}
            </Typography>
          </Box>
        </Box>
        {hasError && (
          <Typography sx={{ ml: 2 }} color="error.main" variant="subtitle2">
            {errors[field]}
          </Typography>
        )}
      </Grid>
    </Grid>
  )
}

export default PostCover
