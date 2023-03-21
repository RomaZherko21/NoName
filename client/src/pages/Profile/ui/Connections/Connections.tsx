import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { Box, Button, Divider, Grid, IconButton, Paper, Tooltip, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

import { useRootStore } from 'stores'
import { InformativeImage, Input, Select, Spinner } from 'shared/ui'
import { ConnectionStatus } from 'shared/types'
import { API_USER_AVATAR_URL } from 'shared/consts'

import { ProfileModel, CONNECTION_OPTIONS } from '../../model'

const Connections = () => {
  const { user } = useRootStore()
  const { t } = useTranslation()

  useEffect(() => {
    ProfileModel.fetchConnections({
      isSent: true,
      isReceived: true,
      status: ConnectionStatus.accept
    })
  }, [])

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        {t('page:connections')}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          gap: 3,
          mb: 3
        }}
      >
        <Input icon={<SearchIcon />} placeholder={t('user:actions.searchName')} />

        {user.isAuthorizedUser(ProfileModel.id) && (
          <Select
            value={ProfileModel.connectionStatus}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              ProfileModel.onConnectionStatusChange(e.target.value as CONNECTION_OPTIONS)
            }}
            label="actions.sortBy"
            options={{
              [CONNECTION_OPTIONS.connections]: 'page:connections',
              [CONNECTION_OPTIONS.sentConnections]: 'user:sentConnections',
              [CONNECTION_OPTIONS.receivedConnections]: 'user:receivedConnections'
            }}
            sx={{ width: 160 }}
          />
        )}
      </Box>

      <Divider />

      <Grid container spacing={1} sx={{ mt: 2 }}>
        {ProfileModel.loading.has ? (
          <Spinner />
        ) : (
          ProfileModel.connections.map((item) => (
            <Grid key={item.email} item xs={12} md={6}>
              <Paper
                sx={{
                  p: 2
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}
                >
                  <InformativeImage
                    imgUrl={`${API_USER_AVATAR_URL}/${item.avatar}`}
                    PrimaryText={`${item.name} ${item.surname}`}
                    SecondaryText={item.email}
                  />

                  <Tooltip title={t('user:moreInfo')}>
                    <IconButton aria-label="upload picture" component="label">
                      <MoreHorizIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
                {item.status === ConnectionStatus.pending &&
                  ProfileModel.connectionStatus === CONNECTION_OPTIONS.sentConnections && (
                    <Button
                      color="error"
                      size="small"
                      onClick={async () => {
                        await ProfileModel.removeConnectionRequest(item.user_id)
                      }}
                      sx={{ mt: 1 }}
                    >
                      {t('user:actions.cancelSending')}
                    </Button>
                  )}

                {item.status === ConnectionStatus.pending &&
                  ProfileModel.connectionStatus === CONNECTION_OPTIONS.receivedConnections && (
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mt: 1,
                        gap: 0.5
                      }}
                    >
                      <Button
                        color="success"
                        size="small"
                        onClick={async () => {
                          await ProfileModel.updateConnectionStatus({
                            id: item.user_id,
                            status: ConnectionStatus.accept
                          })
                        }}
                      >
                        {t('user:actions.accept')}
                      </Button>
                      <Button
                        color="error"
                        size="small"
                        onClick={async () => {
                          await ProfileModel.updateConnectionStatus({
                            id: item.user_id,
                            status: ConnectionStatus.decline
                          })
                        }}
                      >
                        {t('user:actions.declain')}
                      </Button>
                    </Box>
                  )}
              </Paper>
            </Grid>
          ))
        )}
      </Grid>
    </Paper>
  )
}

export default observer(Connections)
