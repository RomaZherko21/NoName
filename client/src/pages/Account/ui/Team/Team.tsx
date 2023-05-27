import { useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import {
  Paper,
  Grid,
  Typography,
  TextField,
  Button,
  Stack,
  TableContainer,
  InputAdornment
} from '@mui/material'
import { AiOutlineMail } from 'react-icons/ai'

import { CommonTable, Pagination, Spinner } from 'shared/ui'

import { getColumns, TeamModel } from './model'

function Team() {
  const { t } = useTranslation()

  const columns = useMemo(() => getColumns(), [])
  return (
    <Paper elevation={4}>
      <Grid container sx={{ p: 3 }}>
        <Grid item xs={12} md={4} spacing={2}>
          <Typography variant="h6">{t('user:actions.inviteMembers')}</Typography>
          <Typography variant="body2" color="text.secondary">
            You currently pay for 2 Editor Seats.
          </Typography>
        </Grid>

        <Grid item xs={12} md={8} sx={{ mt: 1 }}>
          <Stack direction="row">
            <TextField
              fullWidth
              type="email"
              size="small"
              label={t('user:email')}
              placeholder={t('user:email')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AiOutlineMail />
                  </InputAdornment>
                )
              }}
            />
            <Button size="medium" variant="contained" sx={{ minWidth: '110px', ml: 3 }}>
              {t('actions.sendInvite')}
            </Button>
          </Stack>
        </Grid>
      </Grid>
      <Grid>
        {TeamModel.loading.has ? (
          <Spinner />
        ) : (
          <TableContainer component={Paper} sx={{ borderRadius: '0 0 10px 10px' }}>
            <CommonTable data={TeamModel.users} columns={columns} />
            <Pagination paginationModel={TeamModel.pagination} />
          </TableContainer>
        )}
      </Grid>
    </Paper>
  )
}

export default observer(Team)
