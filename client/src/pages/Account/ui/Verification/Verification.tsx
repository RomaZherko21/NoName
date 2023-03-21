import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Card, Typography } from '@mui/material'

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
      <Card elevation={16} sx={{ p: 4 }}>
        <Typography variant="h6">{t('user:verifStatuses')}</Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 2,
            mt: 3
          }}
        >
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
            isActive={user.is_email_verified}
          />

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
            isActive={user.is_phone_verified}
          />
        </Box>
      </Card>

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
