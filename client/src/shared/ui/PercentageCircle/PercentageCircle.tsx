import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar'
import { Paper, Typography, useTheme } from '@mui/material'
import 'react-circular-progressbar/dist/styles.css'

interface Props {
  percentage: number
  caption: string
  color: 'warning' | 'neutral' | 'success'
}

const PercentageCircle = ({ percentage, caption = '', color }: Props) => {
  const theme = useTheme()
  const { t } = useTranslation()

  let pathColor = theme.palette.success.dark
  let text = ''

  switch (color) {
    case 'warning':
      pathColor = theme.palette.error.main
      text = t('notification:status.warning')
      break
    case 'neutral':
      pathColor = theme.palette.warning.main
      text = t('notification:status.neutral')
      break
    case 'success':
      pathColor = theme.palette.success.main
      text = t('notification:status.good')
      break
  }

  return (
    <Paper
      style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      <Typography color={pathColor} variant="h5">
        {text}
      </Typography>
      <div style={{ width: '160px', height: '160px' }}>
        <CircularProgressbarWithChildren
          value={percentage}
          styles={buildStyles({
            pathColor: pathColor,
            trailColor: theme.palette.background.default,
          })}
        >
          <Typography color="primaryText" variant="h5">
            {`${percentage}%`}
          </Typography>
          <Typography color="textSecondary" variant="caption">
            {caption}
          </Typography>
        </CircularProgressbarWithChildren>
      </div>
    </Paper>
  )
}

export default observer(PercentageCircle)
