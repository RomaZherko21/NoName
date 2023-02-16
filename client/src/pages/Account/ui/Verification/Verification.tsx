import { useTranslation } from 'react-i18next'
import { Button, Grid, Paper, Typography } from '@mui/material'

import { CircleDevider } from 'shared/ui'
import { useDialog } from 'shared/hooks'
import VerificationCodeModal, { SEND_TYPE } from './VerificationCodeModal'

function Verification() {
  const { t } = useTranslation()

  const [showConfirmationModal] = useDialog(
    'notification:verification',
    (onClose) => (
      <VerificationCodeModal onClose={onClose} sendTo="sdff@gmail.com" sendType={SEND_TYPE.email} />
    ),
    true
  )

  return (
    <Grid
      component={Paper}
      elevation={16}
      container
      spacing={2}
      sx={{ p: 2, borderRadius: 2, width: 'fit-content', m: '0 auto' }}
    >
      <Grid item xs={12}>
        <Typography variant="h6">{t('user:verifStatuses')}</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper variant="outlined" sx={{ p: 3, pb: 1, borderRadius: 2 }}>
          <Typography
            variant="body2"
            color={true ? 'error' : 'success.main'}
            sx={{ mb: 1, display: 'flex', alignItems: 'center' }}
          >
            <CircleDevider
              sx={{
                backgroundColor: (theme) =>
                  true ? theme.palette.error.main : theme.palette.success.main,
                ml: 0,
              }}
            />
            {true ? t('actions.off') : t('actions.on')}
          </Typography>
          <Typography variant="subtitle2">{t('user:emailVerif')}</Typography>
          <Typography variant="body2" color="text.secondary">
            {t('user:updates.security.receiveEmailCode')}
          </Typography>
          <Button
            sx={{
              mt: 4,
              width: 'fit-content',
            }}
            size="small"
            onClick={() => showConfirmationModal()}
          >
            {t('actions.sendCode')}
          </Button>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper variant="outlined" sx={{ p: 3, pb: 1, borderRadius: 2 }}>
          <Typography
            variant="body2"
            color="error"
            sx={{ mb: 1, display: 'flex', alignItems: 'center' }}
          >
            <CircleDevider sx={{ backgroundColor: (theme) => theme.palette.error.main, ml: 0 }} />
            {t('actions.off')}
          </Typography>
          <Typography variant="subtitle2">{t('user:phoneVerif')}</Typography>
          <Typography variant="body2" color="text.secondary">
            {t('user:updates.security.receiveSmsCode')}
          </Typography>
          <Button
            sx={{
              mt: 4,
              width: 'fit-content',
            }}
            size="small"
          >
            {t('actions.sendCode')}
          </Button>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default Verification
