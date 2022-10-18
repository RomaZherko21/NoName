import { observer } from 'mobx-react-lite'
import { Avatar, Box, Card, CardContent, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'

import { Spinner } from 'shared/ui'
import { BookModel } from 'pages/Book/model'

import s from './Styles.module.scss'

const AuthorInfo = () => {
  // const handleUploadClick = async (event: any) => {
  //   await user.uploadPhoto(event.target.files[0])
  // }

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {BookModel.loading.has ? (
            <Spinner />
          ) : (
            <label htmlFor="upload-file">
              <input
                id="upload-file"
                name="avatar"
                type="file"
                accept="image/*"
                // onChange={handleUploadClick}
                style={{ display: 'none' }}
              />
              <div className={s.avatar}>
                <Avatar
                  style={{ cursor: 'pointer' }}
                  alt="Upload"
                  // src={user.getPhotoUrl()}
                  sx={{ width: 100, height: 100 }}
                />
                <EditIcon className={s.editIcon} />
              </div>
            </label>
          )}
          <Typography color="textPrimary" gutterBottom textAlign="center" variant="h5">
            AUTHOR NAME
          </Typography>
          <Typography color="textSecondary" variant="body2">
            some info
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default observer(AuthorInfo)
