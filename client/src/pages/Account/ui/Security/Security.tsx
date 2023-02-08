import { Button, Grid, Paper, Stack, Typography } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useTranslation } from 'react-i18next'

import { CircleDevider, Input } from 'shared/ui'

function Security() {
  const { t } = useTranslation()

  return (
    <>
      <Paper sx={{ mb: 4, borderRadius: '20px' }}>
        <Grid container sx={{ p: 4 }}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">{t('translation:actions.changePassword')}</Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <Stack direction="row" justifyContent="space-between">
              <Input placeholder="Password" />
              <Button size="small" variant="text" sx={{ ml: 2 }}>
                {t('actions.edit')}
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
      <Paper sx={{ borderRadius: '20px' }}>
        <Grid container spacing={2} sx={{ p: 4, pt: 2 }}>
          <Grid item xs={12}>
            <Typography variant="h6">{t('user:multiFactorAuthentication')}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper variant="outlined" sx={{ p: 4, pl: 3, pr: 3, borderRadius: '20px' }}>
              <Stack direction="column">
                <Typography
                  variant="body2"
                  color="error"
                  sx={{ mb: 1, display: 'flex', alignItems: 'center' }}
                >
                  <CircleDevider sx={{ backgroundColor: (theme) => theme.palette.error.main }} />
                  {t('actions.off')}
                </Typography>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  {t('user:authenticatorApp')}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t('user:updates.security.generateCode')}
                </Typography>
                <Button
                  endIcon={<ArrowForwardIcon />}
                  sx={{ mt: 4, width: 'fit-content' }}
                  variant="outlined"
                  size="medium"
                >
                  {t('actions.setUp')}
                </Button>
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper variant="outlined" sx={{ p: 4, pl: 3, pr: 3, borderRadius: '20px' }}>
              <Stack direction="column">
                <Typography
                  variant="body2"
                  color="error"
                  sx={{ mb: 1, display: 'flex', alignItems: 'center' }}
                >
                  <CircleDevider sx={{ backgroundColor: (theme) => theme.palette.error.main }} />
                  {t('actions.off')}
                </Typography>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  {t('user:textMessage')}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t('user:updates.security.receiveCode')}
                </Typography>
                <Button
                  endIcon={<ArrowForwardIcon />}
                  sx={{ mt: 4, width: 'fit-content' }}
                  variant="outlined"
                  size="medium"
                >
                  {t('actions.setUp')}
                </Button>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </>
  )
}

export default Security
