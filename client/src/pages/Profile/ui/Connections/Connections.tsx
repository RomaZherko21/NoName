import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

import { InformativeImage, Input, Select, Spinner } from 'shared/ui'
import { ConnectionStatus } from 'shared/types'
import { API_USER_AVATAR_URL } from 'shared/consts'
import { ProfileModel } from 'pages/Profile/model'

const Connections = () => {
  const { t } = useTranslation()

  useEffect(() => {
    ProfileModel.fetchConnections({
      isSent: true,
      isReceived: true,
      status: ConnectionStatus.accept,
    })
  }, [])

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ p: 3 }}>
        {t('page:connections')}
      </Typography>
      <Divider />
      <Box sx={{ p: 3, display: 'flex', alignItems: 'flex-end', gap: 3 }}>
        <Input fullWidth={false} icon={<SearchIcon />} placeholder={t('user:actions.searchName')} />
        <Select
          value={ProfileModel.connectionStatus}
          onChange={(event: any) => ProfileModel.onConnectionStatusChange(event.target.value)}
          label="actions.sortBy"
          options={{
            connections: 'page:connections',
            sentConnections: 'user:sentConnections',
            receivedConnections: 'user:receivedConnections',
          }}
          sx={{ width: '160px' }}
        />
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
                  <Stack>
                    <InformativeImage
                      imgUrl={`${API_USER_AVATAR_URL}/${item.avatar}`}
                      PrimaryText={`${item.name} ${item.surname}`}
                      SecondaryText={item.email}
                    />
                    {item.status === ConnectionStatus.pending &&
                      ProfileModel.connectionStatus === 'sentConnections' && (
                        <Button
                          color="error"
                          size="small"
                          sx={{ mt: 2, width: 'fit-content' }}
                          onClick={() => ProfileModel.removeConnectionRequest(item.user_id)}
                        >
                          {t('user:actions.cancelSending')}
                        </Button>
                      )}
                    {item.status === ConnectionStatus.pending &&
                      ProfileModel.connectionStatus === 'receivedConnections' && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
                          <Button
                            color="success"
                            size="small"
                            sx={{ mt: 1 }}
                            onClick={() =>
                              ProfileModel.updateConnectionStatus({
                                id: item.user_id,
                                status: ConnectionStatus.accept,
                              })
                            }
                          >
                            {t('user:actions.accept')}
                          </Button>
                          <Button
                            color="error"
                            size="small"
                            sx={{ mt: 1 }}
                            onClick={() =>
                              ProfileModel.updateConnectionStatus({
                                id: item.user_id,
                                status: ConnectionStatus.decline,
                              })
                            }
                          >
                            {t('user:actions.declain')}
                          </Button>
                        </Box>
                      )}
                  </Stack>
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
