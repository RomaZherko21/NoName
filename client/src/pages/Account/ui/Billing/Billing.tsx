import { useMemo, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { Formik } from 'formik'
import {
  Button,
  CardContent,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
  Box,
  List,
  ListItem
} from '@mui/material'
import { BsFillLayersFill } from 'react-icons/bs'
import { MdOutlineModeEditOutline } from 'react-icons/md'

import { BillingStatus } from 'shared/types'
import { InputField } from 'shared/ui'

import { BillingModel } from './model'
import { getBillingConfig } from './getBillingConfig'

function Billing(props: any) {
  const { t } = useTranslation()
  const [isEditActive, setIsEditActive] = useState(false)
  useEffect(() => { BillingModel.getBilling() }, [])
  // const billingConfig = useMemo(() => getBillingConfig(props), [props])
  const SUBSCRIPTON_TYPES = useMemo(
    () => [
      {
        price: '$0.00',
        name: t('user:startup'),
        status: BillingStatus.startup
      },
      {
        price: '$4.99',
        name: t('user:standard'),
        status: BillingStatus.standard
      },
      {
        price: '$29.99',
        name: t('user:business'),
        status: BillingStatus.business
      }
    ],
    [t]
  )

  const logger = () => {
    BillingModel.getBilling()
    console.log(BillingModel.card_number)
  }

  return (
    <Grid component={Paper} elevation={4} spacing={5} sx={{ p: 3 }}>
      <Grid sx={{ mb: 2 }}>
        <Typography variant="h6">{t('user:actions.changePlan')}</Typography>
        <Typography variant="body2" color="text.secondary">
          {t('user:billingAdvice')}
        </Typography>
      </Grid>
      <Grid container spacing={2} direction="row">
        {SUBSCRIPTON_TYPES.map((item) => (
          <Grid key={item.name} item xs={4}>
            <CardContent
              sx={{
                p: 4,
                borderRadius: '20px',
                border:
                  BillingModel.billingStatus === item.status
                    ? '2px solid #7582eb'
                    : '1px solid #2d3748'
              }}
              onClick={() => {
                BillingModel.billingStatus = item.status
              }}
            >
              <BsFillLayersFill />
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Typography variant="h5">{item.price}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  /{t('user:month')}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <Typography variant="overline" sx={{ textTransform: 'uppercase' }}>
                  {item.name}
                </Typography>
                {BillingModel.billingStatus === item.status && (
                  <Typography
                    variant="caption"
                    sx={{ ml: 3, color: ({ palette }) => palette.primary.dark }}
                  >
                    {t('user:actions.usingNow')}
                  </Typography>
                )}
              </Box>
            </CardContent>
          </Grid>
        ))}
      </Grid>
      <Divider variant="fullWidth" sx={{ mt: 3, mb: 3 }} />
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h6">{t('user:billingDetails')}</Typography>
        <Button startIcon={<MdOutlineModeEditOutline />} color="inherit" onClick={() => setIsEditActive(!isEditActive)}>
          {isEditActive ? t('actions.save') : t('actions.edit')}
        </Button>
      </Stack>

      <Formik initialValues={{
        cardHolderName: 'name',
        number: '**** 1111',
        expiryDate: "04/2027",
        cvv: 575

      }}
        onSubmit={(values) => console.log(values)} >

        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <List
              sx={{
                border: '1px solid #2d3748',
                borderRadius: '8px',
                mb: 2,
                pt: 0,
                pb: 0
              }}>
              {isEditActive && (
                <>
                  <ListItem sx={{ gap: 5 }}>
                    <InputField label='Card holder name' field='' size='small' />
                  </ListItem>
                  <ListItem sx={{ gap: 5 }}>
                    <InputField label='Card number' field='' size='small' />
                  </ListItem>
                  <ListItem sx={{ gap: 5 }}>
                    <InputField label='Expiry date' field='' size='small' />
                  </ListItem>
                  <ListItem sx={{ gap: 5 }}>
                    <InputField label='CVV' field='' size='small' />
                  </ListItem>
                </>
              )}
              {!isEditActive && (<>
                <ListItem sx={{ borderBottom: '1px solid #2d3748', gap: 5 }}>
                  <Typography variant="subtitle2" sx={{ minWidth: '150px' }}>
                    {t('user:bankCard.cardHolderName')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {BillingModel.name_on_card}
                  </Typography>
                </ListItem>
                <ListItem sx={{ borderBottom: '1px solid #2d3748', gap: 5 }}>
                  <Typography variant="subtitle2" sx={{ minWidth: '150px' }}>
                    {t('user:bankCard.number')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {BillingModel.card_number}
                  </Typography>
                </ListItem>
                <ListItem sx={{ borderBottom: '1px solid #2d3748', gap: 5 }}>
                  <Typography variant="subtitle2" sx={{ minWidth: '150px' }}>
                    {t('user:bankCard.expiryDate')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {BillingModel.valid_thru}
                  </Typography>
                </ListItem>
                <ListItem sx={{ gap: 5 }}>
                  <Typography variant="subtitle2" sx={{ minWidth: '150px' }}>
                    {t('user:bankCard.cvv')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {BillingModel.cvv}
                  </Typography>
                </ListItem>
              </>)}
            </List>
          </form>
        )}

      </Formik>

      <Stack direction="row" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="body2" color="text.secondary">
          We cannot refund once you purchased a subscription, but you can always
        </Typography>
        <Button>{t('user:actions.cancel')}</Button>
      </Stack>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button onClick={() => logger()} variant="contained">{t('user:actions.upgradePlan')}</Button>
      </Box>
    </Grid>
  )
}

export default observer(Billing)
