import { observer } from 'mobx-react-lite'
import { Container, Paper, Box, Alert } from '@mui/material'
import { useTranslation } from 'react-i18next'

import logo from 'shared/assets/images/logo/white-transparent-logo.svg'

import s from './Styles.module.scss'
import { BackButton } from '../BackButton'

function AuthWrapper({
  children,
  showBackButton
}: {
  children: React.ReactNode
  showBackButton?: boolean
}) {
  const { t } = useTranslation()

  return (
    <Box
      sx={{
        background: ({ palette }) =>
          `linear-gradient(45deg, ${palette.background.default} 30%, rgba(37, 69, 125, 1) 80%, rgba(3, 175, 213, 1) 100%)`
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          gap: 15
        }}
      >
        <img src={logo} className={s.logo} alt="Logo" />

        <Box>
          {showBackButton && <BackButton />}
          <Paper
            elevation={16}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minWidth: 550,
              p: 3
            }}
          >
            {children}
          </Paper>
          <Alert severity="error" sx={{ mt: 2.5 }}>
            {t('auth:youCanUse')} <strong>&quot;{t('auth:login')}&quot;</strong> {t('auth:and')}{' '}
            {t('auth:password')}
            <strong>&quot;{t('auth:passwordValue')}&quot;</strong>
          </Alert>
        </Box>
      </Container>
    </Box>
  )
}

export default observer(AuthWrapper)
