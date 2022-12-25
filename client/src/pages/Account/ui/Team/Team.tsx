import { useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import {
  Paper,
  CardContent,
  Grid,
  Typography,
  Divider,
  Box,
  TextField,
  Button,
  Stack,
  FormControl,
} from '@mui/material'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import InputAdornment from '@mui/material/InputAdornment'

import { CommonTable, Spinner } from 'shared/ui'

import { getColumns } from './model/columns'
import { TeamModel } from './model'

function Team() {
  const columns = useMemo(() => getColumns(), [])
  const { t } = useTranslation()

  return (
    <Paper elevation={1}>
      <Grid container sx={{ gap: 1, pt: 5, pr: 3, pb: 3, pl: 3 }}>
        <Grid md={12}>
          <Stack spacing={2} sx={{ mb: 3 }}>
            <Typography variant="h6">{t('user:inviteMembers')}</Typography>
            <Typography variant="body2" color="text.secondary">
              You currently pay for 2 Editor Seats.
            </Typography>
          </Stack>
          <Divider light={true} sx={{ borderColor: '#edf2f7', opacity: 0.3 }} />
        </Grid>
        <Grid container direction="row" justifyContent="space-between" sx={{ mt: 0.5 }}>
          <Grid item xs={10.5} alignItems="center">
            <TextField
              fullWidth
              type="email"
              size="small"
              label={t('user:emailAddress')}
              placeholder={t('user:inputPlaceholder')}
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
            <Button color="primary" size="medium" variant="contained" type="submit">
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
