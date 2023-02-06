import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import {
  Box,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

import { InformativeImage, Spinner } from 'shared/ui'
import { ConnectionStatus } from 'shared/types'
import { API_USER_AVATAR_URL } from 'shared/consts'
import { ProfileModel } from 'pages/Profile/model'

const Connections = () => {
  const { t } = useTranslation()

  useEffect(() => {
    ProfileModel.fetch({ isSent: true, isReceived: true, status: ConnectionStatus.accept })
  }, [])

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ p: 3 }}>
        {t('page:connections')}
      </Typography>
      <Divider />
      <Box sx={{ p: 3, display: 'flex', alignItems: 'flex-end', gap: 3 }}>
        <SearchIcon />
        <TextField id="input-with-sx" label={t('user:actions.searchName')} variant="standard" />
      </Box>
      <Divider />

      <Grid container spacing={3} sx={{ p: 3 }}>
        {ProfileModel.loading.has ? (
          <Spinner />
        ) : (
          ProfileModel.connections.map((item) => (
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Stack
                  direction="row"
                  spacing={3}
                  alignItems="start"
                  justifyContent="space-between"
                >
                  <InformativeImage
                    imgUrl={`${API_USER_AVATAR_URL}/${item.avatar}`}
                    PrimaryText={`${item.name} ${item.surname}`}
                    SecondaryText={item.email}
                  />
                  <IconButton aria-label="upload picture" component="label">
                    <Tooltip title={t('user:moreInfo')}>
                      <MoreHorizIcon />
                    </Tooltip>
                  </IconButton>
                </Stack>
              </Paper>
            </Grid>
          ))
        )}
      </Grid>
    </Paper>
  )
}

export default observer(Connections)
