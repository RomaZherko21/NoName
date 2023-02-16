import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Grid, Paper, Typography } from '@mui/material'

import { CircleDevider } from 'shared/ui'
import { useTimer } from 'shared/hooks'
import VerificationCodeModal, { SEND_TYPE } from './VerificationCodeModal'
import { VerificationModel } from './model'
import { useRootStore } from 'stores'

function Verification() {
  const { t } = useTranslation()
  const { user } = useRootStore()

  const [isOpenModal, setIsOpenModal] = useState(false)

  const { timeLeft, setTimeLeft, isTimerEnded } = useTimer()

  function onStartTimer() {
    setTimeLeft(60)
  }

  return (
    <>
      <Grid
        component={Paper}
        elevation={16}
        container
        spacing={2}
        sx={{ p: 2, borderRadius: 2, width: 'fit-content', m: '0 auto' }}
      >
        <Grid item xs={12} sx={{ mt: 2 }}>
          <Typography variant="h6">{t('user:verifStatuses')}</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper variant="outlined" sx={{ p: 4, borderRadius: 2 }}>
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
              disabled={!isTimerEnded}
              onClick={async () => {
                VerificationModel.verificationType = SEND_TYPE.email
                await VerificationModel.sendCode()
                setIsOpenModal(true)
                onStartTimer()
              }}
            >
              {t('actions.sendCode')} {!isTimerEnded && timeLeft}
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper variant="outlined" sx={{ p: 4, borderRadius: 2 }}>
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
              disabled={!isTimerEnded}
              onClick={async () => {
                VerificationModel.verificationType = SEND_TYPE.phone
                await VerificationModel.sendCode()
                setIsOpenModal(true)
                onStartTimer()
              }}
            >
              {t('actions.sendCode')} {!isTimerEnded && timeLeft}
            </Button>
          </Paper>
        </Grid>
      </Grid>

      <VerificationCodeModal
        open={isOpenModal}
        handleClose={() => {
          setIsOpenModal(false)
        }}
        timeLeft={timeLeft}
        isTimerEnded={isTimerEnded}
        sendTo={
          VerificationModel.verificationType === SEND_TYPE.email ? user.email : user.tel_number
        }
        subtitle={t(
          `user:updates.security.${
            VerificationModel.verificationType === SEND_TYPE.email ? 'sentEmailCode' : 'sentSmsCode'
          }`
        )}
        onSubmit={async (code: string) => {
          await VerificationModel.verifyCode(code)
        }}
        onSendCodeAgain={() => {
          VerificationModel.sendCode()
          onStartTimer()
        }}
      />
    </>
  )
}

export default Verification
