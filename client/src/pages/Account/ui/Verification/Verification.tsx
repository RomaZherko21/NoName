import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Grid, Paper, Typography } from '@mui/material'

import { useRootStore } from 'stores'
import { OptionSetup } from 'shared/ui'
import { useTimer } from 'shared/hooks'

import VerificationCodeModal from './VerificationCodeModal'
import { SEND_TYPE, VerificationModel } from './model'

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
          <OptionSetup
            title={t('user:emailVerif')}
            subtitle={t('user:updates.security.receiveEmailCode')}
            onClick={async () => {
              VerificationModel.verificationType = SEND_TYPE.email
              await VerificationModel.sendCode()
              setIsOpenModal(true)
              onStartTimer()
            }}
            buttonText={`${t('actions.sendCode')} ${!isTimerEnded ? timeLeft : ''}`}
            disabled={!isTimerEnded}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <OptionSetup
            title={t('user:phoneVerif')}
            subtitle={t('user:updates.security.receiveSmsCode')}
            onClick={async () => {
              VerificationModel.verificationType = SEND_TYPE.phone
              await VerificationModel.sendCode()
              setIsOpenModal(true)
              onStartTimer()
            }}
            buttonText={`${t('actions.sendCode')} ${!isTimerEnded ? timeLeft : ''}`}
            disabled={!isTimerEnded}
          />
        </Grid>
      </Grid>

      <VerificationCodeModal
        open={isOpenModal}
        handleClose={() => {
          setIsOpenModal(false)
        }}
        title={
          VerificationModel.verificationType === SEND_TYPE.email ? user.email : user.tel_number
        }
        subtitle={t(
          `user:updates.security.${
            VerificationModel.verificationType === SEND_TYPE.email ? 'sentEmailCode' : 'sentSmsCode'
          }`
        )}
        timeLeft={timeLeft}
        isTimerEnded={isTimerEnded}
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
