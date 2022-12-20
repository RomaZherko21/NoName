import { Box, Button, Card, Divider, Grid, Paper, Stack, Switch, Typography } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useTranslation } from 'react-i18next'

import { InputFilter } from 'shared/ui'

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
              <InputFilter placeholder="Password" />
            </Stack>
          </Grid>
        </Grid>
      </Paper>
      <Paper>
        <Grid container spacing={2} sx={{ p: 4 }}>
          <Grid item xs={12} sx={{ mb: 2 }}>
            <Typography variant="h5">
              {t('translation:common.multiFactorAuthentication')}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Stack direction="column">
                <Typography variant="h6" color="error" sx={{ mb: 3 }}>
                  {t('translation:actions.off')}
                </Typography>
                <Typography variant="subtitle1">
                  {t('translation:common.authenticatorApp')}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t('translation:updates.security.generateCode')}
                </Typography>
                <Button
                  endIcon={<ArrowForwardIcon />}
                  sx={{ mt: 3, width: 'fit-content' }}
                  variant="outlined"
                  size="small"
                >
                  {t('translation:actions.setUp')}
                </Button>
              </Stack>
            </Paper>
          </Grid>
          <Grid item>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Stack direction="column">
                <Typography variant="h6" color="error" sx={{ mb: 3 }}>
                  {t('translation:actions.off')}
                </Typography>
                <Typography variant="subtitle1">{t('translation:common.textMessage')}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {t('translation:updates.security.receiveCode')}
                </Typography>
                <Button
                  endIcon={<ArrowForwardIcon />}
                  sx={{ mt: 3, width: 'fit-content' }}
                  variant="outlined"
                  size="small"
                >
                  {t('translation:actions.setUp')}
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
