import { observer } from 'mobx-react-lite'
import * as yup from 'yup'
import { useMemo } from 'react'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import { Avatar, Button, Grid, TextField } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'

import { commonStringValidation } from 'shared/validations'
import { useRootStore } from 'stores'

import { ItemsModel } from '../../model'
import styles from './Styles.module.scss'

interface FormValues {
  name: string
  description: string
  image: string
}

function CreateItemForm({ hideModal }: any) {
  const { t } = useTranslation()

  const { user } = useRootStore()

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        name: commonStringValidation('Name', 3),
        description: commonStringValidation('Description', 8),
      }),
    []
  )

  const { handleSubmit, values, handleChange, touched, errors, setFieldValue } =
    useFormik<FormValues>({
      initialValues: {
        name: '',
        description: '',
        image: '',
      },
      validationSchema,
      onSubmit: (value: FormValues) => {
        ItemsModel.create({ ...value, userId: user.id })
        hideModal()
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
            label={t('item:name')}
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
            label={t('item:description')}
            value={values.description}
            onChange={handleChange}
            error={touched.description && Boolean(errors.description)}
            helperText={touched.description && errors.description}
          />
        </Grid>
        <Grid item>
          <label htmlFor="upload-file">
            <input
              id="upload-file"
              name="item"
              type="file"
              accept="image/*"
              onChange={(event: any) => {
                setFieldValue('item', event.target.files[0])
              }}
              style={{ display: 'none' }}
            />
            <div className={styles.avatar}>
              <Avatar
                style={{ cursor: 'pointer' }}
                alt="Upload"
                variant="square"
                src={values.image}
                sx={{ width: 50, height: 50 }}
              />
              <EditIcon className={styles.editIcon} />
            </div>
          </label>
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

export default observer(CreateItemForm)
