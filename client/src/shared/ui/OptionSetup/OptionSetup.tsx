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
}

function OptionSetup({ title, subtitle, onClick, buttonText, disabled }: Props) {
  const { t } = useTranslation()

  return (
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

      <Typography variant="subtitle2">{title}</Typography>
      <Typography variant="body2" color="text.secondary">
        {subtitle}
      </Typography>

      <Button
        sx={{
          mt: 4,
          width: 'fit-content',
        }}
        size="small"
        disabled={disabled}
        onClick={onClick}
      >
        {buttonText}
      </Button>
    </Paper>
  )
}

export default observer(OptionSetup)
