import { observer } from 'mobx-react-lite'
import * as yup from 'yup'
import { useMemo } from 'react'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { Button, Grid, TextField } from '@mui/material'

import { commonStringValidation } from 'shared/validations'
import { useRootStore } from 'stores'
import { UploadImage } from 'shared/ui'

import { PostsModel } from '../../model'
import styles from './Styles.module.scss'

interface FormValues {
  name: string
  description: string
  post: File | ''
}

function CreatePostForm({ hideModal }: any) {
  const { t } = useTranslation()

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
        toast.success(t('notification:successful.created'))
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
        <Grid item style={{ width: 'fit-content' }}>
          <UploadImage
            handleUploadClick={(event: any) => {
              setFieldValue('post', event.target.files[0])
            }}
            width={50}
            height={50}
            imageUrl={values.post && URL.createObjectURL(values.post)}
          />
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
