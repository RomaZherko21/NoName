import * as yup from 'yup'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { Box, Button, FormControlLabel, Stack, Switch, Typography } from '@mui/material'
import { Formik } from 'formik'

import { FormTimePicker, InputField, Modal } from 'shared/ui'
import { required } from 'shared/validations'

interface Props {
  isOpen: boolean
  dayId?: Date
  handleClose: () => void
}

function AddEvent({ isOpen, handleClose }: Props) {
  const { t } = useTranslation()

  const validationSchema = yup.object().shape({
    title: required(t('calendar:title'))
  })

  return (
    <Modal open={isOpen} handleClose={handleClose}>
      <Box sx={{ p: 3, minWidth: '600px' }}>
        <Typography variant="h5" align="center" sx={{ mb: 6 }}>
          {t('calendar:titleEvent')}
        </Typography>

        <Formik
          initialValues={{
            title: ''
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log('title', values)
          }}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <Stack justifyContent="center" spacing={2}>
                <InputField field="title" label="calendar:title" />
                <InputField field="description" label="calendar:description" />
                <FormControlLabel control={<Switch defaultChecked />} label="All day" />
                <FormTimePicker label="Start" field="start" />
                <FormTimePicker label="End" field="end" />

                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    onClick={handleClose}
                    sx={{
                      boxShadow: 'none',
                      background: ({ palette }) => palette.grey[900],
                      color: ({ palette }) => palette.grey[100],
                      '&:hover': {
                        backgroundColor: 'action.hover'
                      }
                    }}
                    variant="contained"
                  >
                    {t('actions.cancel')}
                  </Button>
                  <Button color="primary" variant="contained" type="submit">
                    {t('common.confirm')}
                  </Button>
                </Box>
              </Stack>
            </form>
          )}
        </Formik>
      </Box>
    </Modal>
  )
}

export default observer(AddEvent)
