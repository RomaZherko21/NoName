import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
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
} from '@mui/material'
import LayersIcon from '@mui/icons-material/Layers'
import EditIcon from '@mui/icons-material/Edit'

import { BillingModel, BillingStatus } from './model'

function Billing() {
  const { t } = useTranslation()
  const SUBSCRIPTON_TYPES = [
    { price: '$0', name: t('user:startup'), status: BillingStatus.startup },
    { price: '$4.99', name: t('user:standard'), status: BillingStatus.standard },
    { price: '$29.99', name: t('user:business'), status: BillingStatus.business },
  ]

  function changeBillingStatus(item: any) {
    if (BillingStatus.startup === item.status) {
      BillingModel.billingStatus = BillingStatus.startup
    } else if (BillingStatus.standard === item.status) {
      BillingModel.billingStatus = BillingStatus.standard
    } else if (BillingStatus.business === item.status) {
      BillingModel.billingStatus = BillingStatus.business
    }
  }
  return (
    <Paper elevation={1}>
      <Grid spacing={5} sx={{ p: 3 }}>
        <Grid sx={{ mb: 2 }}>
          <Typography variant="h6">{t('user:actions.changePlan')}</Typography>
          <Typography variant="body2" color="text.secondary">
            {t('user:billingAdvice')}
          </Typography>
        </Grid>
        <Grid container spacing={5} direction="row">
          {SUBSCRIPTON_TYPES.map((item) => (
            <Grid item xs={4}>
              <CardContent
                sx={{
                  p: 4,
                  borderRadius: '8px',
                  border:
                    BillingModel.billingStatus === item.status
                      ? '2px solid #7582eb'
                      : '1px solid #2d3748',
                }}
                onClick={() => {
                  changeBillingStatus(item)
                }}
              >
                <LayersIcon />
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Typography variant="h5">{item.price}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    /{t('user:month')}
                  </Typography>
                </Box>
                <Box
                  sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <Typography variant="overline" sx={{ textTransform: 'uppercase' }}>
                    {item.name}
                  </Typography>
                  {BillingModel.billingStatus === item.status && (
                    <Typography variant="caption">{t('user:actions.usingNow')}</Typography>
                  )}
                </Box>
              </CardContent>
            </Grid>
          ))}
        </Grid>
        <Divider variant="fullWidth" sx={{ mt: 3, mb: 3 }} />
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Typography variant="h6">{t('user:billingDetails')}</Typography>
          <Button>
            <EditIcon fontSize="small" />
            {t('actions.edit')}
          </Button>
        </Stack>
        <List sx={{ border: '1px solid #2d3748', borderRadius: '8px', mb: 2 }}>
          <ListItem sx={{ borderBottom: '1px solid #2d3748', gap: 5 }}>
            <Typography variant="subtitle2">{t('user:billingName')}</Typography>
            <Typography variant="body2" color="text.secondary">
              John Doe
            </Typography>
          </ListItem>
          <ListItem sx={{ borderBottom: '1px solid #2d3748', gap: 5 }}>
            <Typography variant="subtitle2">{t('user:cardNumber')}</Typography>
            <Typography variant="body2" color="text.secondary">
              **** 1111
            </Typography>
          </ListItem>
          <ListItem sx={{ borderBottom: '1px solid #2d3748', minWidth: '180px', gap: 5 }}>
            <Typography variant="subtitle2">{t('user:country')}</Typography>
            <Typography variant="body2" color="text.secondary">
              Germany
            </Typography>
          </ListItem>
          <ListItem sx={{ gap: 5 }}>
            <Typography variant="subtitle2">{t('user:zipAndPostalCode')}</Typography>
            <Typography variant="body2" color="text.secondary">
              667123
            </Typography>
          </ListItem>
        </List>
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
    </Paper>
  )
}

export default observer(Billing)
