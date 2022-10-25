import { observer } from 'mobx-react-lite'
import * as yup from 'yup'
import { useEffect, useMemo } from 'react'
import { Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import { Button, Grid } from '@mui/material'

import { commonStringValidation } from 'shared/validations'
import { InputField, MultiSelectField } from 'shared/ui'

import styles from './Styles.module.scss'
import { BookModel, GenresModel } from '../../model'

interface Props {
  hideModal: () => void
}

function BookForm({ hideModal }: Props) {
  const { t } = useTranslation()

  useEffect(() => {
    GenresModel.fetchGenres()
  }, [])

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        name: commonStringValidation(t(`user:name`), 3),
      }),
    [t]
  )

  const onSubmit = (value: any) => {
    hideModal()
  }

  return (
    <Formik
      initialValues={{
        name: BookModel.name,
        description: BookModel.description || '',
        year: BookModel.year,
        publisher: BookModel.publisher || '',
        genres: BookModel.genres.map((item) => item.name) || [],
        quantity: BookModel.quantity,
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
            <Grid item md={6} xs={6}>
              <MultiSelectField field="genres" label="book:genre" options={GenresModel.genres} />
            </Grid>
            <Grid item md={6} xs={6}>
              <InputField field="quantity" label="book:quantity" />
            </Grid>
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
