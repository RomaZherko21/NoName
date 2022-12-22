import { useTranslation } from 'react-i18next'
import { Box, Button, Card, Grid, Stack, Typography } from '@mui/material'
import { useState } from 'react'

import IncomeAreaChart from './IncomeAreaChart'
import MonthlyBarChart from './MonthlyBarChart'

const Charts = () => {
  const { t } = useTranslation()
  const [slot, setSlot] = useState('week')

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} md={7} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5" color="text.primary">
              Unique Visitor
            </Typography>
          </Grid>
          <Grid item>
            <Stack direction="row" alignItems="center" spacing={0}>
              <Button
                size="small"
                onClick={() => setSlot('month')}
                color={slot === 'month' ? 'primary' : 'secondary'}
                variant={slot === 'month' ? 'outlined' : 'text'}
              >
                {t('user:month')}
              </Button>
              <Button
                size="small"
                onClick={() => setSlot('week')}
                color={slot === 'week' ? 'primary' : 'secondary'}
                variant={slot === 'week' ? 'outlined' : 'text'}
              >
                {t('user:week')}
              </Button>
            </Stack>
          </Grid>
        </Grid>
        <Card>
          <Box sx={{ pt: 1, pr: 2 }}>
            <IncomeAreaChart slot={slot} />
          </Box>
        </Card>
      </Grid>

      <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5" color="text.primary">
              Income Overview
            </Typography>
          </Grid>
          <Grid item />
        </Grid>
        <Card>
          <Box sx={{ p: 3, pb: 0 }}>
            <Stack spacing={2}>
              <Typography variant="h6" color="textSecondary">
                This Week Statistics
              </Typography>
              <Typography variant="h3">$7,650</Typography>
            </Stack>
          </Box>
          <MonthlyBarChart />
        </Card>
      </Grid>
    </Grid>
  )
}

export default Charts
