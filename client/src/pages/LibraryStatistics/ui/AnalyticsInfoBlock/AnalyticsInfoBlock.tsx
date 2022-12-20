import { useTranslation } from 'react-i18next'
import { Box, Card, Chip, Grid, Stack, Typography } from '@mui/material'

import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import TrendingDownIcon from '@mui/icons-material/TrendingDown'

const AnalyticsInfoBlock = ({ color = 'info', title, count, percentage, isLoss, extra }: any) => {
  const { t } = useTranslation()

  return (
    <Card sx={{ padding: 2 }}>
      <Stack spacing={0.5}>
        <Typography variant="body2" color="textSecondary">
          {title}
        </Typography>
        <Grid container alignItems="center">
          <Grid item>
            <Typography variant="h5" color="inherit">
              {count}
            </Typography>
          </Grid>
          {percentage && (
            <Grid item>
              <Chip
                variant="filled"
                color={color}
                icon={
                  isLoss ? (
                    <TrendingDownIcon style={{ fontSize: '0.75rem', color: 'inherit' }} />
                  ) : (
                    <TrendingUpIcon style={{ fontSize: '0.75rem', color: 'inherit' }} />
                  )
                }
                label={`${percentage}%`}
                sx={{ ml: 1.25, pl: 1 }}
                size="small"
              />
            </Grid>
          )}
        </Grid>
      </Stack>
      <Box sx={{ pt: 2.25 }}>
        <Typography variant="caption" color="textSecondary">
          {t('translation:common.youMadeAnExtra')}{' '}
          <Typography
            component="span"
            variant="caption"
            sx={{ color: `${color || 'primary'}.main` }}
          >
            {extra}
          </Typography>{' '}
          {t('translation:common.thisYear')}
        </Typography>
      </Box>
    </Card>
  )
}

export default AnalyticsInfoBlock
