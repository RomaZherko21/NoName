import { observer } from 'mobx-react-lite'
import * as yup from 'yup'
import { useMemo } from 'react'
import { Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import { Button, Grid, TextField } from '@mui/material'

import { commonStringValidation } from 'shared/validations'
import { GENDER, ROLES } from 'shared/consts'

import styles from './Styles.module.scss'
import { InputField, MultiSelectField, SelectField } from 'shared/ui'

import { BookModel } from '../../model'

interface Props {
  hideModal: () => void
}

function BookForm({ hideModal }: Props) {
  const { t } = useTranslation()

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        name: commonStringValidation(t(`user:name`), 3),
      }),
    [t]
  )

  const onSubmit = (value: any) => {
    console.log(value)
    hideModal()
  }

  return (
    <Formik
      initialValues={{
        name: BookModel.name,
        description: BookModel.description || '',
        quantity: BookModel.quantity,
        year: BookModel.year,
        publisher: BookModel?.publisher || '',
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit} className={styles.centered}>
          <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
              <InputField field="name" label="book:name" />
            </Grid>
            <Grid item md={4} xs={12}>
              <InputField field="year" label="book:year" />
            </Grid>
            <Grid item md={4} xs={12}>
              <InputField field="publisher" label="book:publisher" />
            </Grid>
            <Grid item md={12} xs={12}>
              <InputField field="description" label="book:description" multiline />
            </Grid>
            {/* <Grid item md={4} xs={12}>
              <MultiSelectField field="gender" label="user:gender" options={GENDER} />
            </Grid> */}
            <Grid item xs={12}>
              <Button color="primary" variant="contained" type="submit">
                {t('common.confirm')}
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  )
}

export default observer(BookForm)
