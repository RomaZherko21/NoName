import { useTranslation } from 'react-i18next'
import { Box, Card, Divider, Grid, Stack, Switch, Typography } from '@mui/material'
import { useRootStore } from 'stores'

function Notifications() {
  const { t } = useTranslation()
  const { user } = useRootStore()

  return (
    <Card elevation={4} sx={{ p: 4 }}>
      <Grid container sx={{ p: 1.5 }}>
        <Grid item xs={12} md={4}>
          <Typography variant="h6">{t('user:email')}</Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
            <Box>
              <Typography variant="subtitle1">{t('user:updates.product.title')}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {t('user:updates.product.text')}
              </Typography>
            </Box>
            <Switch disabled />
          </Stack>

          <Divider />

          <Stack direction="row" justifyContent="space-between" sx={{ mt: 3 }}>
            <Box>
              <Typography variant="subtitle1">{t('user:updates.security.title')}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {t('user:updates.security.text')}
              </Typography>
            </Box>
            <Switch
              defaultChecked={user.is_email_alerts_active}
              disabled={!user.is_email_verified}
              onChange={() => {
                user.toggleEmailAlerts()
              }}
            />
          </Stack>
        </Grid>
      </Grid>
      <Divider sx={{ mt: 2, mb: 2 }} />
      <Grid container sx={{ p: 1.5 }}>
        <Grid item xs={12} md={4}>
          <Typography variant="h6">{t('user:phoneNotification')}</Typography>
        </Grid>

        <Grid item xs={12} md={8}>
          <Stack direction="row" justifyContent="space-between">
            <Box>
              <Typography variant="subtitle1">{t('user:updates.security.title')}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {t('user:updates.security.text')}
              </Typography>
            </Box>

            <Switch
              defaultChecked={user.is_sms_alerts_active}
              disabled={!user.is_phone_verified}
              onChange={() => {
                user.toggleSmsAlerts()
              }}
            />
          </Stack>
        </Grid>
      </Grid>
    </Card>
  )
}

export default Notifications
