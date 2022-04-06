import { observer } from 'mobx-react-lite'
import * as yup from 'yup'
import { useMemo } from 'react'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import { Button, Grid, TextField } from '@mui/material'

import { commonStringValidation } from 'validations'
import { useRootStore } from 'stores/Root'
import { Item } from 'types/item'

import ItemsModel from '../Items.model'
import styles from './Styles.module.scss'

const CreateItemForm = ({ hideModal }: any) => {
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

  const { handleSubmit, values, handleChange, touched, errors } =
    useFormik<Item>({
      initialValues: {
        name: '',
        description: '',
      },
      validationSchema,
      onSubmit: (value: Item) => {
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
          <Button color="primary" variant="contained" fullWidth type="submit">
            {t('common.confirm')}
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default observer(CreateItemForm)
