import { useTranslation } from 'react-i18next'
import { Box, Card, Divider, Grid, Stack, Switch, Typography } from '@mui/material'

function Notifications() {
  const { t } = useTranslation()

  return (
    <>
      <Card sx={{ mt: 2 }}>
        <Grid container sx={{ p: 4 }}>
          <Grid item xs={12} md={4}>
            <Typography variant="h5">{t('user:email')}</Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
              <Box>
                <Typography variant="h6">{t('translation:updates.product.title')}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}></Typography>
              </Box>
              <Switch defaultChecked />
            </Stack>
            <Divider />
            <Stack direction="row" justifyContent="space-between" sx={{ mt: 3 }}>
              <Box>
                <Typography variant="h6">{t('translation:updates.security.title')}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  {t('translation:updates.security.text')}
                </Typography>
              </Box>
              <Switch defaultChecked />
            </Stack>
          </Grid>
        </Grid>
      </Card>
      <Card sx={{ mt: 2 }}>
        <Grid container sx={{ p: 4 }}>
          <Grid item xs={12} md={4}>
            <Typography variant="h5">{t('translation:common.phoneNotification')}</Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
              <Box>
                <Typography variant="h6">{t('translation:updates.product.title')}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  {t('translation:updates.product.text')}
                </Typography>
              </Box>
              <Switch defaultChecked />
            </Stack>
          </Grid>
        </Grid>
      </Card>
    </>
  )
}

export default Notifications
