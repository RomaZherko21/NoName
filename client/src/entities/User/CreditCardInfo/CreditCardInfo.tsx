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
  Divider,
  ListItemIcon,
  Typography
  // TextField
} from '@mui/material'

import { getListConfig } from './getListConfig'
import { BsCalendar2Event, BsCreditCard2Back } from 'react-icons/bs'
import { BiLockAlt, BiUser } from 'react-icons/bi'
import { InputField } from 'shared/ui'
import { Formik } from 'formik'
import { ProfileModel } from 'pages/Profile/model'
// import { getFullName } from 'shared/helpers'
import { useRootStore } from 'stores'
import { toast } from 'react-toastify'

function CreditCardInfo(props: any) {
  const { t } = useTranslation()
  const [isEditActive, setIsEditActive] = useState(false)
  const { user } = useRootStore()

  const listConfig = useMemo(() => getListConfig(props), [props])

  return (
    <Paper elevation={4} sx={{ width: '100%', p: 0 }}>
      <CardHeader
        titleTypographyProps={{ variant: 'h6' }}
        title={t('user:payment')}
        sx={{ pb: 0 }}
      />
      {!isEditActive && (
        <List>
          {listConfig.map(({ Icon, text, title }) => (
            <>
              <ListItem key={text} sx={{ m: 0.89 }}>
                <ListItemIcon sx={{ p: 0, m: 0, fontSize: 16 }}>
                  <Icon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="body2" sx={{ width: 180 }}>
                      {t(title)}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body2" color="text.secondary">
                      {' '}
                      {text}{' '}
                    </Typography>
                  }
                  sx={{ display: 'flex', alignItems: 'center' }}
                />
              </ListItem>
              <Divider />
            </>
          ))}
          <CardActions>
            <Button
              type="button"
              size="small"
              sx={{ color: ({ palette }) => palette.text.primary }}
              onClick={() => setIsEditActive(!isEditActive)}
            >
              {isEditActive ? t('actions.save') : t('actions.edit')}
            </Button>
          </CardActions>
        </List>
      )}

      {isEditActive && (
        <Formik
          initialValues={{
            card_number: props.cardNumber,
            name_on_card: props.nameOnCard,
            valid_thru: props.validThru,
            cvv: props.cvv
          }}
          // validationSchema={validationSchema}
          onSubmit={(values) => {
            setIsEditActive(!isEditActive)
            if (isEditActive) {
              ProfileModel.putCreditCard(values)
              // toast.success(t('notification:success.updated'))
              console.log(values)
            }
          }}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <ListItem>
                <ListItemIcon sx={{ p: 0, m: 0, fontSize: 16 }}>
                  <BsCreditCard2Back />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="body2" sx={{ width: 180 }}>
                      {t('user:cardNumber')}
                    </Typography>
                  }
                  secondary={<InputField field="card_number" label="" size="small" />}
                  sx={{ display: 'flex', alignItems: 'center' }}
                />
              </ListItem>
              <Divider />

              <ListItem>
                <ListItemIcon sx={{ p: 0, m: 0, fontSize: 16 }}>
                  <BiUser />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="body2" sx={{ width: 180 }}>
                      {t('user:bankCard.cardHolderName')}
                    </Typography>
                  }
                  secondary={<InputField field="name_on_card" label="" size="small" />}
                  sx={{ display: 'flex', alignItems: 'center' }}
                />
              </ListItem>
              <Divider />

              <ListItem>
                <ListItemIcon sx={{ p: 0, m: 0, fontSize: 16 }}>
                  <BsCalendar2Event />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="body2" sx={{ width: 180 }}>
                      {t('user:bankCard.expiryDate')}
                    </Typography>
                  }
                  secondary={<InputField field="valid_thru" label="" size="small" />}
                  sx={{ display: 'flex', alignItems: 'center' }}
                />
              </ListItem>
              <Divider />

              <ListItem>
                <ListItemIcon sx={{ p: 0, m: 0, fontSize: 16 }}>
                  <BiLockAlt />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="body2" sx={{ width: 180 }}>
                      {t('user:bankCard.cvv')}
                    </Typography>
                  }
                  secondary={<InputField field="cvv" label="" size="small" />}
                  sx={{ display: 'flex', alignItems: 'center' }}
                />
              </ListItem>
              <Divider />
              <CardActions>
                <Button
                  type="submit"
                  size="small"
                  sx={{ color: ({ palette }) => palette.text.primary }}
                >
                  {isEditActive ? t('actions.save') : t('actions.edit')}
                </Button>
              </CardActions>
            </form>
          )}
        </Formik>
      )}
    </Paper>
  )
}

export default observer(CreditCardInfo)
