import { Trans, useTranslation } from 'react-i18next'
import { Box, Typography } from '@mui/material'

import { ROUTES } from 'shared/consts'
import { VerificationCode } from 'shared/ui'

export enum SEND_TYPE {
  email = 'email',
  number = 'number',
}

interface Props {
  sendTo: string
  sendType: SEND_TYPE
  onClose: () => void
}

function VerificationCodeModal({ sendTo, sendType }: Props) {
  const { t } = useTranslation()

  return (
    <Box
      sx={{
        px: 6,
        py: 3,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        m: '0 auto',
      }}
    >
      <Typography variant="h5">{sendTo}</Typography>
      <Typography sx={{ mt: 1 }} variant="subtitle2" color="text.secondary">
        {sendType === SEND_TYPE.email
          ? t('user:updates.security.sentEmailCode')
          : t('user:updates.security.sentSmsCode')}
      </Typography>
      <VerificationCode
        sx={{ mt: 4 }}
        onSubmit={(value) => {
          console.log(value)
        }}
      />
      <Typography sx={{ mt: 5 }} variant="subtitle2" color="text.secondary">
        <Trans i18nKey="sentences:support">
          <Typography
            onClick={() => {
              window.location.href = ROUTES.HELP
            }}
            variant="subtitle2"
            color="primary.main"
            sx={{ display: 'inline', cursor: 'pointer' }}
          >
            Help
          </Typography>
        </Trans>
      </Typography>
    </Box>
  )
}

export default VerificationCodeModal
