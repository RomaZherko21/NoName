import { observer } from 'mobx-react-lite'
import { useLocation } from 'react-router-dom'
import { Container, Paper, Box, Alert } from '@mui/material'

import { ROUTES } from 'shared/consts'
import logo from 'shared/assets/images/logo/white-transparent-logo.svg'

import s from './Styles.module.scss'
import { BackButton } from '../BackButton'

function AuthWrapper({ children }: any) {
  let location = useLocation()

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
          {location.pathname === ROUTES.FORGOT_PASSWORD && <BackButton />}
          {location.pathname === ROUTES.RESET_PASSWORD && <BackButton />}
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
            You can use <strong>&quot;admin@gmail.com&quot;</strong> and password{' '}
            <strong>&quot;qwerqwer&quot;</strong>
          </Alert>
        </Box>
      </Container>
    </Box>
  )
}

export default observer(AuthWrapper)
