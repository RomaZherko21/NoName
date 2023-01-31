import { useMemo, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { Button, Grid, TextField, Box, Typography, Tooltip } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import ClearIcon from '@mui/icons-material/Clear'

import { commonStringValidation } from 'shared/validations'
import { useRootStore } from 'stores'
import selectFile from 'assets/images/selectFile.svg'

import { PostsModel } from '../../model'
import styles from './Styles.module.scss'

interface FormValues {
  name: string
  description: string
  post: File | ''
}

function CreatePostForm({ hideModal }: any) {
  const { t } = useTranslation()
  const hiddenFileInput = useRef<any>(null)

  const { user } = useRootStore()

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        name: commonStringValidation(t('user:name'), 3),
        description: commonStringValidation(t('user:description'), 8),
      }),
    [t]
  )

  const { handleSubmit, values, handleChange, touched, errors, setFieldValue } =
    useFormik<FormValues>({
      initialValues: {
        name: '',
        description: '',
        post: '',
      },
      validationSchema,
      onSubmit: (value: FormValues) => {
        PostsModel.create({ ...value, user_id: user.id })
        hideModal()
        toast.success(t('notification:success.created'))
      },
    })

  return (
    <form onSubmit={handleSubmit} className={styles.centered}>
      <Grid item container spacing={2} direction="column">
        <Grid item>
          <TextField
            fullWidth
            id="name"
            name="name"
            label={t('post:name')}
            value={values.name}
            onChange={handleChange}
            error={touched.name && Boolean(errors.name)}
            helperText={touched.name && errors.name}
          />
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            id="description"
            name="description"
            label={t('post:description')}
            value={values.description}
            onChange={handleChange}
            error={touched.description && Boolean(errors.description)}
            helperText={touched.description && errors.description}
          />
        </Grid>
        <Grid item md={8} sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 2,
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
              onChange={(event: any) => setFieldValue('post', event.target.files[0])}
              style={{ display: 'none' }}
            />
            <Box>
              <img alt="Select file" src={selectFile} style={{ height: 50, width: 50 }} />
            </Box>
            <Box>
              <Typography variant="body1" sx={{ mb: 0.5 }}>
                {t('post:actions.selectFile')}
              </Typography>
              <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
                {t('post:form.selectiveHint')}
              </Typography>
            </Box>
          </Box>
          {values.post && (
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
                  <Typography variant="subtitle2">{values.post.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {values.post.size} KB
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" alignItems="center" justifyContent="center">
                <Tooltip title="Remove" placement="bottom">
                  <Button onClick={() => setFieldValue('post', '')}>
                    <ClearIcon fontSize="medium" color="action" />
                  </Button>
                </Tooltip>
              </Box>
            </Box>
          )}
        </Grid>
        <Grid item>
          <Button color="primary" variant="contained" fullWidth type="submit">
            {t('common.confirm')}
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default observer(CreatePostForm)
