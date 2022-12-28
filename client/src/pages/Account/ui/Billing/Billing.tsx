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

import { BillingModel } from './model'

function Billing() {
  const { t } = useTranslation()

  return (
    <Paper elevation={1}>
      <Grid spacing={5} sx={{ p: 3 }}>
        <Grid sx={{ mb: 2 }}>
          <Typography variant="h6">{t('user:actions.changePlan')}</Typography>
          <Typography variant="body2" color="text.secondary">
            {t('user:youCanUpgradeAndDowngradeWheneverYouWant')}
          </Typography>
        </Grid>
        <Grid container spacing={5} direction="row">
          <Grid item xs={4}>
            <CardContent
              sx={
                BillingModel.planStatus.isStartupActive
                  ? {
                      p: 4,
                      border: '2px solid #7582eb',
                      borderRadius: '8px',
                    }
                  : {
                      p: 4,
                      border: '1px solid #2d3748',
                      borderRadius: '8px',
                    }
              }
              onClick={() => BillingModel.setIsStartupActive()}
            >
              <LayersIcon />
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Typography variant="h5">$0</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  /{t('user:month')}
                </Typography>
              </Box>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="overline">{t('user:startup')}</Typography>
                {BillingModel.planStatus.isStartupActive && (
                  <Typography variant="caption">{t('user:actions.usingNow')}</Typography>
                )}
              </Stack>
            </CardContent>
          </Grid>
          <Grid item xs={4}>
            <CardContent
              sx={
                BillingModel.planStatus.isStandardActive
                  ? {
                      p: 4,
                      border: '2px solid #7582eb',
                      borderRadius: '8px',
                    }
                  : {
                      p: 4,
                      border: '1px solid #2d3748',
                      borderRadius: '8px',
                    }
              }
              onClick={() => BillingModel.setIsStandardActive()}
            >
              <LayersIcon />
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Typography variant="h5">$4.99</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  /{t('user:month')}
                </Typography>
              </Box>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="overline">{t('user:standard')}</Typography>
                {BillingModel.planStatus.isStandardActive && (
                  <Typography variant="caption">{t('user:actions.usingNow')}</Typography>
                )}
              </Stack>
            </CardContent>
          </Grid>
          <Grid item xs={4}>
            <CardContent
              sx={
                BillingModel.planStatus.isBusinessActive
                  ? {
                      p: 4,
                      border: '2px solid #7582eb',
                      borderRadius: '8px',
                    }
                  : {
                      p: 4,
                      border: '1px solid #2d3748',
                      borderRadius: '8px',
                    }
              }
              onClick={() => BillingModel.setIsBusinessActive()}
            >
              <LayersIcon />
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Typography variant="h5">$29.99</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  /{t('user:month')}
                </Typography>
              </Box>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="overline">{t('user:business')}</Typography>
                {BillingModel.planStatus.isBusinessActive && (
                  <Typography variant="caption">{t('user:actions.usingNow')}</Typography>
                )}
              </Stack>
            </CardContent>
          </Grid>
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
            {t('user:weCannotRefundOnceYouPurchasedASubscriptionButYouCanAlways')}
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
