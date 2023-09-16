import { useMemo, useState } from 'react'
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
} from '@mui/material'

import { BasicUserInfo, MetaUserInfo, UserLocation } from 'shared/types'

import { getListConfig } from './getListConfig'
import { Formik } from 'formik'
import * as yup from 'yup'
import { getFullName, normalizePhone, getSplitName } from 'shared/helpers'
import { FormPhoneNumber, InputField, Select } from 'shared/ui'
import {
  // fullNameValidation,
  emailValidation,
  phoneNumberValidation,
  commonStringValidation
} from 'shared/validations'
import { toast } from 'react-toastify'
import FormCountrySelect from 'shared/ui/Form/FormContrySelect/FormCountrySelect'
import { ProfileModel } from 'pages/Profile/model'
import { FormSelect } from 'shared/ui/Form'
import { FormPhoneNumber2 } from 'shared/ui/Form/FormPhoneNumber2'

interface Props {
  user: BasicUserInfo & MetaUserInfo & UserLocation
}

function UserBasicDetails({ user }: Props) {
  const { t } = useTranslation()

  const [isEditActive, setIsEditActive] = useState(false)

  const listConfig = useMemo(() => getListConfig(user), [user])

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        // full_name: fullNameValidation(),
        email: emailValidation(),
        tel_number: phoneNumberValidation(t('fields.phone')),
        // nativeLocation: commonStringValidation(t('user:nativeLocation')),
        // residenceLocation: commonStringValidation(t('user:residenceLocation')),
        jobTitle: commonStringValidation(t('user:jobTitle'))
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
          native_country: user.native_country,
          native_city: user.native_city,
          residenceLocation: `${user.residence_country}, ${user.residence_city}`,
          residence_country: user.residence_country,
          residence_city: user.residence_city,

          jobTitle: user.job_title
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          setIsEditActive(!isEditActive)
          if (isEditActive) {
            ProfileModel.editUserInfo({
              ...getSplitName(values.fullName),
              email: values.email,
              tel_number: normalizePhone(values.tel_number),

              native_country: values.native_country,
              native_city: values.native_city,
              // nativeLocation: values.nativeLocation,
              // nativeLocation: `${values.native_country}, ${values.native_city}`,

              residence_country: values.residence_country,
              residence_city: values.residence_city,
              // residenceLocation: `${values.residence_country}, ${values.residence_city}`,
              // residenceLocation: values.residenceLocation,
              job_title: values.jobTitle
            })
            console.log(user.residence_country)

            toast.success(t('notification:success.updated'))
          }
        }}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <List sx={{ p: 0 }}>
              {isEditActive && (
                <>
                  <ListItem alignItems="flex-start" sx={{ flexDirection: 'column', mt: '3px' }}>
                    {/* <Typography variant="body1">{t('user:fullName')}</Typography> */}
                    <InputField field={'fullName'} label={t('user:fullName')} />
                  </ListItem>
                  <Divider />
                  <ListItem alignItems="flex-start" sx={{ flexDirection: 'column', mt: '3px' }}>
                    <InputField field={'email'} label={t('user:email')} />
                  </ListItem>
                  <Divider />
                  <ListItem alignItems="flex-start" sx={{ flexDirection: 'column', mt: '3px' }}>
                    <FormPhoneNumber label={t('fields:phone')} field="tel_number" />
                    {/* <InputField field={'tel_number'} label={t('user:telephoneNumber')}></InputField> */}
                  </ListItem>
                  <Divider />
                  <ListItem alignItems="center" sx={{ flexDirection: 'row', mt: '3px' }}>
                    <FormCountrySelect />
                    {/* <InputField field={'native_country'} label={t('user:nativeCountry')} /> */}
                    <InputField field={'native_city'} label={t('user:nativeCity')} />
                  </ListItem>
                  <Divider />
                  <ListItem alignItems="center" sx={{ flexDirection: 'row', mt: '3px' }}>
                    {/* <CountriesSelect /> */}
                    {/* <Select
                      value={'residence_country'}
                      label={t('user:residenceCountry')}
                      options={{}}
                      onChange={function (e: any): void {
                        throw new Error('Function not implemented.')
                      }}
                    /> */}

                    <FormSelect
                      field={'residence_country'}
                      label={t('user:residenceCountry')}
                      options={getCountryConfig}
                    />
                    {/* <InputField field={'residence_country'} label={t('user:residenceCountry')} /> */}
                    <InputField field={'residence_city'} label={t('user:residenceCity')} />
                  </ListItem>
                  <Divider />
                  <ListItem alignItems="flex-start" sx={{ flexDirection: 'column', mt: '3px' }}>
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
                type="submit"
                size="small"
                sx={{ color: ({ palette }) => palette.text.primary }}
              >
                {isEditActive ? t('actions.save') : t('actions.edit')}
              </Button>
            </CardActions>

            <FormPhoneNumber2 />
          </form>
        )}
      </Formik>
    </Paper>
  )
}

export default observer(UserBasicDetails)
