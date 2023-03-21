import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { Button, Paper, Typography } from '@mui/material'

import { CircleDevider } from 'shared/ui'

interface Props {
  title: string
  subtitle: string
  onClick: () => void
  buttonText: string
  disabled: boolean
  isActive: boolean
}

function OptionSetup({ title, subtitle, onClick, buttonText, disabled, isActive }: Props) {
  const { t } = useTranslation()

  return (
    <Paper variant="outlined" sx={{ p: 4, borderRadius: 2, width: '100%' }}>
      <Typography
        variant="body2"
        color={isActive ? 'success.main' : 'error'}
        sx={{ mb: 1, display: 'flex', alignItems: 'center' }}
      >
        <CircleDevider
          sx={{
            backgroundColor: (theme) =>
              isActive ? theme.palette.success.main : theme.palette.error.main,
            ml: 0
          }}
        />
        {isActive ? t('actions.on') : t('actions.off')}
      </Typography>

      <Typography variant="subtitle2">{title}</Typography>
      <Typography variant="body2" color="text.secondary">
        {subtitle}
      </Typography>

      {!isActive && (
        <Button
          sx={{
            mt: 4,
            width: 'fit-content'
          }}
          size="small"
          disabled={disabled}
          onClick={onClick}
        >
          {buttonText}
        </Button>
      )}
    </Paper>
  )
}

export default observer(OptionSetup)
