import { Avatar, Box, Card, CardContent, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'

import { Spinner } from 'shared/ui'
import { useRootStore } from 'stores'

import s from './Styles.module.scss'

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
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {loading.has ? (
            <Spinner />
          ) : (
            <label htmlFor="upload-file">
              <input
                id="upload-file"
                name="avatar"
                type="file"
                accept="image/*"
                onChange={handleUploadClick}
                style={{ display: 'none' }}
              />
              <div className={s.avatar}>
                <Avatar
                  style={{ cursor: 'pointer' }}
                  alt="Upload"
                  src={user.getPhotoUrl()}
                  sx={{ width: 100, height: 100 }}
                />
                <EditIcon className={s.editIcon} />
              </div>
            </label>
          )}
          <Typography color="textPrimary" gutterBottom variant="h5">
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

export default ProfileInfo
