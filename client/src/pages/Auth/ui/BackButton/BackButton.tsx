// import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Container, Box, Button, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import { ROUTES } from 'shared/consts'
import logo from 'shared/assets/images/logo/white-transparent-logo.svg'

import s from './Styles.module.scss'

function BackButton() {
  const navigate = useNavigate()
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
          <Button
            onClick={() => {
              navigate(ROUTES.SIGN_IN)
            }}
            variant="text"
            sx={{
              mb: 2,
              color: ({ palette }) => `${palette.grey[100]}`
            }}
            startIcon={<ArrowBackIcon />}
          >
            <Typography
              sx={{
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
            >
              {t('actions.goBack')}
            </Typography>
          </Button>
        </Box>
      </Container>
    </Box>
  )
}

export default BackButton
