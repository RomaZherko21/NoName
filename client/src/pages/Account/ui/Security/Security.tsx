import { Button, Grid, Paper, Stack, Typography } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useTranslation } from 'react-i18next'

import { Input } from 'shared/ui'

function Security() {
  const { t } = useTranslation()

  return (
    <>
      <Paper sx={{ mb: 4 }}>
        <Grid container sx={{ p: 4 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5">1</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack direction="row" justifyContent="space-between">
              <Input placeholder="Password" />
            </Stack>
          </Grid>
        </Grid>
      </Paper>
      <Paper>
        <Grid container spacing={2} sx={{ p: 4 }}>
          <Grid item xs={12} sx={{ mb: 2 }}>
            <Typography variant="h5">{t('user:multiFactorAuthentication')}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Stack direction="column">
                <Typography variant="h6" color="error" sx={{ mb: 3 }}>
                  {t('actions.off')}
                </Typography>
                <Typography variant="subtitle1">{t('user:authenticatorApp')}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {t('user:updates.security.generateCode')}
                </Typography>
                <Button
                  endIcon={<ArrowForwardIcon />}
                  sx={{ mt: 3, width: 'fit-content' }}
                  variant="outlined"
                  size="small"
                >
                  {t('actions.setUp')}
                </Button>
              </Stack>
            </Paper>
          </Grid>
          <Grid item>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Stack direction="column">
                <Typography variant="h6" color="error" sx={{ mb: 3 }}>
                  {t('actions.off')}
                </Typography>
                <Typography variant="subtitle1">{t('user:textMessage')}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {t('user:updates.security.receiveCode')}
                </Typography>
                <Button
                  endIcon={<ArrowForwardIcon />}
                  sx={{ mt: 3, width: 'fit-content' }}
                  variant="outlined"
                  size="small"
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
