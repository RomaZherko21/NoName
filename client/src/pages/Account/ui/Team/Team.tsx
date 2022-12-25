import { useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { Paper, Grid, Typography, Divider, TextField, Button, Stack } from '@mui/material'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import InputAdornment from '@mui/material/InputAdornment'

import { CommonTable, Spinner } from 'shared/ui'

import { getColumns, TeamModel } from './model'

function Team() {
  const { t } = useTranslation()

  const columns = useMemo(() => getColumns(), [])
  return (
    <Paper elevation={1}>
      <Grid container sx={{ gap: 1, p: 3 }}>
        <Grid xs={12}>
          <Stack spacing={2} sx={{ mb: 3 }}>
            <Typography variant="h6">{t('user:actions.inviteMembers')}</Typography>
            <Typography variant="body2" color="text.secondary">
              You currently pay for 2 Editor Seats.
            </Typography>
          </Stack>
          <Divider light={true} />
        </Grid>
        <Grid container direction="row" justifyContent="space-between" sx={{ mt: 1 }}>
          <Grid item xs={10} alignItems="center">
            <TextField
              fullWidth
              type="email"
              size="small"
              label={t('user:email')}
              placeholder={t('user:email')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailOutlineIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item alignItems="center" justifyContent="center">
            <Button size="medium" variant="contained" type="button">
              {t('actions.sendInvite')}
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid>
        {TeamModel.loading.has ? (
          <Spinner />
        ) : (
          <CommonTable data={TeamModel.users} columns={columns} />
        )}
      </Grid>
    </Paper>
  )
}

export default observer(Team)
