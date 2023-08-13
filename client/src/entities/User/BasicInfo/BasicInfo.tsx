import { useEffect, useMemo, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import {
  Paper,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  CardActions,
  Button,
  Divider
  // Typography
} from '@mui/material'

import { BasicUserInfo, MetaUserInfo, UserLocation } from 'shared/types'

import { getListConfig } from './getListConfig'
import { Formik } from 'formik'
import * as yup from 'yup'
import { getFullName, normalizePhone, getSplitName } from 'shared/helpers'
import { InputField } from 'shared/ui'
import {
  fullNameValidation,
  emailValidation,
  phoneNumberValidation,
  commonStringValidation
} from 'shared/validations'
import UserModel from 'models/User'
import { toast } from 'react-toastify'

// import { ProfileModel } from 'pages/Profile/model'

interface Props {
  user: BasicUserInfo & MetaUserInfo & UserLocation
}

function UserBasicDetails({ user }: Props) {
  const { t } = useTranslation()
  const [isEditActive, setIsEditActive] = useState(false)
  // useEffect(() => {UserModel.fetch()}, [])

  const listConfig = useMemo(() => getListConfig(user), [user])

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        full_name: fullNameValidation(),
        email: emailValidation(),
        tel_number: phoneNumberValidation(t('fields.phone'))
        // nativeLocation: commonStringValidation(t('user:nativeLocation')),
        // residenceLocation: commonStringValidation(t('user:residenceLocation')),
        // jobTitle: commonStringValidation(t('user:jobTitle'))
      }),
    [t]
  )

  return (
    <Paper elevation={4} sx={{ height: 'fit-content' }}>
      <CardHeader
        titleTypographyProps={{ variant: 'h6' }}
        title={t('user:basicDetails')}
        sx={{ pb: 0 }}
      />

      <Formik
        initialValues={{
          fullName: getFullName(user.name, user.surname, user.middle_name),
          email: user.email,
          tel_number: normalizePhone(user.tel_number),
          nativeLocation: `${user.native_country}, ${user.native_city}`,
          residenceLocation: `${user.residence_country}, ${user.residence_city}`,
          jobTitle: user.job_title
        }}
        // validationSchema={validationSchema}
        onSubmit={(values) => {
          // UserModel.update(values
          //   {
          //   ...getSplitName(values.fullName),
          //   email: values.email,
          //   tel_number: normalizePhone(values.tel_number)
          // }
          // )
          console.log(values)

          toast.success(t('notification:success.updated'))
        }}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <List sx={{ p: 0 }}>
              {isEditActive && (
                <>
                  <ListItem alignItems="flex-start" sx={{ flexDirection: 'column', mt: '4px' }}>
                    {/* <Typography variant="body1">{t('user:fullName')}</Typography> */}
                    <InputField field={'fullName'} label={t('user:fullName')} />
                  </ListItem>
                  <Divider />
                  <ListItem alignItems="flex-start" sx={{ flexDirection: 'column', mt: '4px' }}>
                    {/* <Typography variant="body1">{t('user:email')}</Typography> */}
                    <InputField field={'email'} label={t('user:email')} />
                  </ListItem>
                  <Divider />
                  <ListItem alignItems="flex-start" sx={{ flexDirection: 'column', mt: '4px' }}>
                    <InputField field={'tel_number'} label={t('user:telephoneNumber')}></InputField>
                  </ListItem>
                  <Divider />
                  <ListItem alignItems="flex-start" sx={{ flexDirection: 'column', mt: '4px' }}>
                    <InputField field={'nativeLocation'} label={t('user:nativeLocation')} />
                  </ListItem>
                  <Divider />
                  <ListItem alignItems="flex-start" sx={{ flexDirection: 'column', mt: '4px' }}>
                    <InputField field={'residenceLocation'} label={t('user:residenceLocation')} />
                  </ListItem>
                  <Divider />
                  <ListItem alignItems="flex-start" sx={{ flexDirection: 'column', mt: '4px' }}>
                    <InputField field={'jobTitle'} label={t('user:jobTitle')} />
                  </ListItem>
                  <Divider />
                </>
              )}

              {!isEditActive &&
                listConfig.map(({ title, text }) => (
                  <>
                    <ListItem>
                      <ListItemText primary={t(title)} secondary={text} />
                    </ListItem>
                    <Divider />
                  </>
                ))}
            </List>

            <CardActions>
              <Button
                // onSubmit={() => {}}
                type="submit"
                size="small"
                sx={{ color: ({ palette }) => palette.text.primary }}
                onClick={() => setIsEditActive(!isEditActive)}
              >
                {isEditActive ? t('actions.save') : t('actions.edit')}
              </Button>
            </CardActions>
          </form>
        )}
      </Formik>
    </Paper>
  )
}

export default observer(UserBasicDetails)
