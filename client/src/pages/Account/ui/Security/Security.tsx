import { useTranslation } from 'react-i18next'
import { useMemo, useState } from 'react'
import { Button, Grid, Paper, Stack, Typography, TableContainer, Box } from '@mui/material'

import { useRootStore } from 'stores'
import { CommonTable, Input, OptionSetup, Pagination, Spinner } from 'shared/ui'
import { useTimer } from 'shared/hooks'

import { getColumns, SecurityModel } from './model'
import QrCodeModal from './QrCodeModal'

function Security() {
  const { t } = useTranslation()
  const { user } = useRootStore()

  const [isOpenModal, setIsOpenModal] = useState(false)
  const { timeLeft, setTimeLeft, isTimerEnded } = useTimer()

  function onStartTimer() {
    setTimeLeft(60 * 5)
  }

  const columns = useMemo(() => getColumns(), [])
  return (
    <>
      <Paper
        elevation={16}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 4,
          mb: 2,
          borderRadius: 2,
          gap: 5,
        }}
      >
        <Typography variant="h6">{t('translation:actions.changePassword')}</Typography>
        <Stack direction="row" justifyContent="space-between" sx={{ flexGrow: 1 }}>
          <Input placeholder="Password" fullWidth />
          <Button size="small" variant="text" sx={{ ml: 2 }}>
            {t('actions.edit')}
          </Button>
        </Stack>
      </Paper>

      <Paper elevation={16} sx={{ p: 4, mb: 2, borderRadius: 2 }}>
        <Typography variant="h6">{t('user:multiFactorAuthentication')}</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, mt: 3 }}>
          <OptionSetup
            title={t('user:authenticatorApp')}
            subtitle={t('user:updates.security.generateCode')}
            onClick={async () => {
              await SecurityModel.getQRCode()
              setIsOpenModal(true)
              onStartTimer()
            }}
            buttonText={`${t('actions.sendCode')} ${!isTimerEnded ? timeLeft : ''}`}
            disabled={!isTimerEnded}
            isActive={user.is_two_factor_auth_active}
          />

          <OptionSetup
            title={t('user:textMessage')}
            subtitle={t('user:updates.security.receiveSmsCode')}
            onClick={() => {
              user.toggleSmsAlerts()
            }}
            buttonText={`${t('actions.sendCode')}`}
            disabled={user.is_sms_alerts_active}
            isActive={user.is_sms_alerts_active}
          />
        </Box>
      </Paper>

      <Paper elevation={16} sx={{ borderRadius: '20px' }}>
        <Grid item xs={12} md={4} spacing={2} sx={{ p: 3 }}>
          <Typography variant="h6">{t('user:loginHistory')}</Typography>
          <Typography variant="body2" color="text.secondary">
            Your recent login activity
          </Typography>
        </Grid>
        <Grid>
          {SecurityModel.loading.has ? (
            <Spinner />
          ) : (
            <TableContainer component={Paper} sx={{ borderRadius: '0 0 20px 20px' }}>
              <CommonTable data={SecurityModel.entrances} columns={columns} />
              <Pagination paginationModel={SecurityModel.pagination} />
            </TableContainer>
          )}
        </Grid>
      </Paper>

      <QrCodeModal
        open={isOpenModal}
        handleClose={() => {
          setIsOpenModal(false)
        }}
        qrCodeUrl={SecurityModel.qrCodeUrl}
        timeLeft={timeLeft}
        isTimerEnded={isTimerEnded}
        onSubmit={async (code: string) => {
          await SecurityModel.verifyQrCode(code)
        }}
        onSendCodeAgain={() => {
          SecurityModel.getQRCode()
          onStartTimer()
        }}
      />
    </>
  )
}

export default Security
