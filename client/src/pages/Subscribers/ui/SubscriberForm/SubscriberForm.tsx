import { observer } from 'mobx-react-lite'
import * as yup from 'yup'
import { useMemo } from 'react'
import { Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import { Button, Grid } from '@mui/material'

import { commonStringValidation } from 'shared/validations'
import { Subscriber } from 'shared/types'

import styles from './Styles.module.scss'
import { InputField } from 'shared/ui'

function SubscriberForm({
  onSubmit,
  user,
}: {
  onSubmit: (value: Subscriber) => void
  user?: Subscriber
}) {
  const { t } = useTranslation()

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        name: commonStringValidation(t(`user:name`), 3),
        surname: commonStringValidation(t(`user:surname`), 3),
        date_of_birth: commonStringValidation(t(`user:dateOfBirth`), 10),
      }),
    [t]
  )

  return (
    <Formik
      initialValues={{
        name: user?.name || '',
        surname: user?.surname || '',
        middle_name: user?.middle_name || '',
        tel_number: user?.tel_number || '',
        date_of_birth: user?.date_of_birth || '1999-04-21',
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit} className={styles.centered}>
          <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
              <InputField field="name" label="user:name" />
            </Grid>
            <Grid item md={4} xs={12}>
              <InputField field="surname" label="user:surname" />
            </Grid>
            <Grid item md={4} xs={12}>
              <InputField field="middle_name" label="user:middleName" />
            </Grid>
            <Grid item md={8} xs={12}>
              <InputField field="tel_number" label="user:telephoneNumber" />
            </Grid>
            <Grid item md={12} xs={12}>
              <InputField field="date_of_birth" label="user:dateOfBirth" />
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

export default observer(SubscriberForm)
