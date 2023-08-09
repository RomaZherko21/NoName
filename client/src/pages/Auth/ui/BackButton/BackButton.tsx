import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import { ROUTES } from 'shared/consts'

function BackButton() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
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
  )
}

export default BackButton
