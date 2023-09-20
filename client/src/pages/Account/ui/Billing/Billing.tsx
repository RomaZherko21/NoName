import { useMemo, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { Formik } from 'formik'
import * as yup from 'yup'
import { toast } from 'react-toastify'
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
  ListItem,
  ListItemText
} from '@mui/material'
import { BsFillLayersFill } from 'react-icons/bs'
import { MdOutlineModeEditOutline, MdDoneOutline } from 'react-icons/md'

import { BillingStatus } from 'shared/types'
import { InputField, Spinner } from 'shared/ui'
import { commonStringValidation, expirationDate } from 'shared/validations'
import { creditCardValidation } from 'shared/validations'

import { BillingModel } from './model'
import { getBillingConfig } from './getBillingConfig'

function Billing() {
  const { t } = useTranslation()
  const [isEditActive, setIsEditActive] = useState(false)

  const billingConfig = getBillingConfig()

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        name_on_card: commonStringValidation(t('user:bankCard.cardHolderName'), 3),
        card_number: creditCardValidation(t('user:bankCard.number'), 16),
        valid_thru: expirationDate(t('user:bankCard.expiryDate')),
        cvv: creditCardValidation(t('user:bankCard.cvv'), 3)
      }),
    [t]
  )

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

  useEffect(() => {
    BillingModel.fetch()
  }, [])

  return (
    <>
      {BillingModel.loading.has ? (
        <Spinner />
      ) : (
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

          <Formik
            initialValues={{
              name_on_card: BillingModel.creditCardInfo.name_on_card,
              card_number: BillingModel.creditCardInfo.card_number,
              valid_thru: BillingModel.creditCardInfo.valid_thru,
              cvv: BillingModel.creditCardInfo.cvv
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              BillingModel.updateCreditCardInfo({
                ...values,
                name_on_card: values.name_on_card?.trim()
              })
              toast.success(t('notification:success.updated'))
            }}
          >
            {({ handleSubmit, dirty }) => (
              <>
                <form onSubmit={handleSubmit}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ mb: 3 }}
                  >
                    <Typography variant="h6">{t('user:billingDetails')}</Typography>
                    {isEditActive ? (
                      <Button
                        type="submit"
                        onClick={() => {
                          setIsEditActive((pre) => !pre)

                          if (dirty) {
                            handleSubmit()
                          }
                        }}
                        id="submit"
                        startIcon={<MdDoneOutline />}
                        color="inherit"
                      >
                        {t('actions.save')}
                      </Button>
                    ) : (
                      <Button
                        onClick={(e) => {
                          e.preventDefault()
                          setIsEditActive((pre) => !pre)
                        }}
                        startIcon={<MdOutlineModeEditOutline />}
                        color="inherit"
                      >
                        {t('actions.edit')}
                      </Button>
                    )}
                  </Stack>

                  <List
                    sx={{
                      border: '1px solid #2d3748',
                      borderRadius: '8px',
                      mb: 2,
                      pt: 0,
                      pb: 0
                    }}
                  >
                    {billingConfig.map((cardInfo, index) => (
                      <>
                        <ListItem key={cardInfo.field} sx={{ m: 0 }}>
                          <ListItemText
                            primary={
                              <Typography variant="body2" sx={{ width: 190 }}>
                                {t(cardInfo.title)}
                              </Typography>
                            }
                            secondary={
                              <InputField
                                field={cardInfo.field}
                                label=""
                                size="small"
                                isEditActive={isEditActive}
                              />
                            }
                            sx={{ display: 'flex', alignItems: 'center' }}
                          />
                        </ListItem>
                        {billingConfig.length !== index + 1 && <Divider />}
                      </>
                    ))}
                  </List>
                </form>
              </>
            )}
          </Formik>

          <Stack direction="row" alignItems="center" sx={{ mb: 3 }}>
            <Typography variant="body2" color="text.secondary">
              We cannot refund once you purchased a subscription, but you can always
            </Typography>

            <Button>{t('user:actions.cancel')}</Button>
          </Stack>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained">{t('user:actions.upgradePlan')}</Button>
          </Box>
        </Grid>
      )}
    </>
  )
}

export default observer(Billing)
