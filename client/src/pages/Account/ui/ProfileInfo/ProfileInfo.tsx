import { observer } from 'mobx-react-lite'
import { Box, Card, CardContent, Typography } from '@mui/material'

import { Spinner, UploadImage } from 'shared/ui'
import { useRootStore } from 'stores'
import { API_USER_AVATAR_URL } from 'shared/consts'

const ProfileInfo = (props: any) => {
  const { user, loading } = useRootStore()

  const handleUploadClick = async (event: any) => {
    await user.uploadPhoto(event.target.files[0])
  }

  return (
    <Card {...props}>
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          {loading.has ? (
            <Spinner />
          ) : (
            <UploadImage
              handleUploadClick={handleUploadClick}
              imageUrl={`${API_USER_AVATAR_URL}/${user.avatar.url}`}
            />
          )}
          <Typography color="textPrimary" gutterBottom textAlign="center" variant="h5">
            {user.name}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {`${user.surname}`}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {user.email}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {user.role}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default observer(ProfileInfo)
